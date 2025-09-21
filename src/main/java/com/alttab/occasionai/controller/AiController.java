package com.alttab.occasionai.controller;

import com.alttab.occasionai.model.*;
import com.alttab.occasionai.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/story")
    public ResponseEntity<?> generateStory(@Valid @RequestBody StoryRequest request) {
        try {
            String story = aiService.generateStory(request.getArtisanName(), request.getCraftType());
            return ResponseEntity.ok(new ApiResponse<>(true, "Story generated successfully", story));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Story generation failed: " + e.getMessage()));
        }
    }

    @PostMapping("/social")
    public ResponseEntity<?> generateSocialPosts(@Valid @RequestBody SocialRequest request) {
        try {
            List<String> posts = aiService.generateSocialPosts(request.getCraftType(), request.getTone());
            return ResponseEntity.ok(new ApiResponse<>(true, "Social posts generated successfully", posts));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Social posts generation failed: " + e.getMessage()));
        }
    }
}
