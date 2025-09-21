package com.alttab.occasionai.model;

import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private String email;
    private String craftType;

    public RegisterRequest() {}

    public RegisterRequest(String username, String password, String email, String craftType) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.craftType = craftType;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCraftType() { return craftType; }
    public void setCraftType(String craftType) { this.craftType = craftType; }
}
