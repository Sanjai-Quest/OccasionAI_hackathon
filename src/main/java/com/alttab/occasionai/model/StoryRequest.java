package com.alttab.occasionai.model;

import jakarta.validation.constraints.NotBlank;

public class StoryRequest {
    @NotBlank
    private String artisanName;

    @NotBlank
    private String craftType;

    public StoryRequest() {}

    public StoryRequest(String artisanName, String craftType) {
        this.artisanName = artisanName;
        this.craftType = craftType;
    }

    // Getters and Setters
    public String getArtisanName() { return artisanName; }
    public void setArtisanName(String artisanName) { this.artisanName = artisanName; }
    public String getCraftType() { return craftType; }
    public void setCraftType(String craftType) { this.craftType = craftType; }
}