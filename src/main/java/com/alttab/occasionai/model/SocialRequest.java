package com.alttab.occasionai.model;

import jakarta.validation.constraints.NotBlank;

public class SocialRequest {
    @NotBlank
    private String craftType;

    private String tone = "friendly";

    public SocialRequest() {}

    public SocialRequest(String craftType, String tone) {
        this.craftType = craftType;
        this.tone = tone;
    }

    // Getters and Setters
    public String getCraftType() { return craftType; }
    public void setCraftType(String craftType) { this.craftType = craftType; }
    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }
}