package com.alttab.occasionai.controller;

import com.alttab.occasionai.config.SecurityConfig;
import com.alttab.occasionai.model.*;
import com.alttab.occasionai.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);

            return ResponseEntity.ok(new ApiResponse<>(true, "Login successful",
                    new JwtResponse(token, userDetails.getUsername())));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Invalid username or password"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Authentication failed"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            SecurityConfig.CustomInMemoryUserDetailsManager userManager =
                    (SecurityConfig.CustomInMemoryUserDetailsManager) userDetailsService;

            if (userManager.userExists(registerRequest.getUsername())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse<>(false, "Username already exists"));
            }

            userManager.createUser(registerRequest.getUsername(), registerRequest.getPassword(), passwordEncoder);

            final UserDetails userDetails = userDetailsService.loadUserByUsername(registerRequest.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);

            return ResponseEntity.ok(new ApiResponse<>(true, "Registration successful",
                    new JwtResponse(token, userDetails.getUsername())));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Registration failed: " + e.getMessage()));
        }
    }
}
