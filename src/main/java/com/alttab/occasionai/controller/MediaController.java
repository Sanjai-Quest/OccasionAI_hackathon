package com.alttab.occasionai.controller;

import com.alttab.occasionai.model.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Value("${file.upload.dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            // Create upload directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            List<String> fileNames = new ArrayList<>();

            for (MultipartFile file : files) {
                if (file.isEmpty()) {
                    continue;
                }

                // Validate file type
                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.badRequest()
                            .body(new ApiResponse<>(false, "Only image files are allowed"));
                }

                // Generate unique filename
                String originalFileName = file.getOriginalFilename();
                String extension = originalFileName != null ?
                        originalFileName.substring(originalFileName.lastIndexOf(".")) : ".jpg";
                String fileName = UUID.randomUUID().toString() + extension;

                // Save file
                Path filePath = Paths.get(uploadDir, fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                fileNames.add(fileName);
            }

            return ResponseEntity.ok(new ApiResponse<>(true, "Files uploaded successfully", fileNames));

        } catch (IOException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "File upload failed: " + e.getMessage()));
        }
    }
}
