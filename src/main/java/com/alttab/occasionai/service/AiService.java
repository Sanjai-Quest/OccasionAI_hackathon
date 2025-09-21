package com.alttab.occasionai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    @Value("${google.ai.studio.api.key}")
    private String apiKey;

    @Value("${google.ai.studio.base.url}")
    private String baseUrl;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public AiService() {
        this.webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public String generateStory(String artisanName, String craftType) {
        String prompt = String.format(
                "Write a 200-word engaging narrative about %s's %s process and heritage. " +
                        "Focus on the artisan's passion, traditional techniques, and the cultural significance of their craft. " +
                        "Make it inspiring and authentic.",
                artisanName, craftType
        );

        return callGoogleAI(prompt);
    }

    public List<String> generateSocialPosts(String craftType, String tone) {
        String prompt = String.format(
                "Generate 7 different social media post captions with hashtags for %s crafts. " +
                        "Use a %s tone. Each post should be engaging, include relevant hashtags, and be suitable for Instagram/Facebook. " +
                        "Format each post as a complete caption with hashtags at the end. " +
                        "Separate each post with '---' on a new line.",
                craftType, tone
        );

        String response = callGoogleAI(prompt);

        // Split the response into individual posts
        String[] posts = response.split("---");
        List<String> postList = new ArrayList<>();

        for (String post : posts) {
            String trimmedPost = post.trim();
            if (!trimmedPost.isEmpty()) {
                postList.add(trimmedPost);
            }
        }

        // If splitting didn't work as expected, return the full response as a single item
        if (postList.isEmpty()) {
            postList.add(response);
        }

        return postList;
    }

    private String callGoogleAI(String prompt) {
        try {
            // Validate inputs
            if (apiKey == null || apiKey.trim().isEmpty()) {
                throw new RuntimeException("Google AI Studio API key is not configured");
            }

            if (baseUrl == null || baseUrl.trim().isEmpty()) {
                throw new RuntimeException("Google AI Studio base URL is not configured");
            }

            // Prepare request body for Google AI Studio API
            Map<String, Object> requestBody = Map.of(
                    "contents", Arrays.asList(
                            Map.of("parts", Arrays.asList(
                                    Map.of("text", prompt)
                            ))
                    )
            );

            System.out.println("Making request to: " + baseUrl);
            System.out.println("Request body: " + objectMapper.writeValueAsString(requestBody));

            String response = webClient.post()
                    .uri(baseUrl + "?key=" + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .block();

            System.out.println("Raw API Response: " + response);
            return extractTextFromResponse(response);

        } catch (WebClientResponseException e) {
            System.err.println("WebClient Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw new RuntimeException("Google AI Studio API Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            System.err.println("General Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to call Google AI Studio API: " + e.getMessage(), e);
        }
    }

    private String extractTextFromResponse(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);

            // Check for error in response
            JsonNode error = rootNode.get("error");
            if (error != null) {
                String errorMessage = error.get("message").asText();
                String errorCode = error.get("code").asText();
                throw new RuntimeException("Google AI Studio Error " + errorCode + ": " + errorMessage);
            }

            JsonNode candidates = rootNode.get("candidates");

            if (candidates != null && candidates.isArray() && candidates.size() > 0) {
                JsonNode firstCandidate = candidates.get(0);

                // Check for finish reason
                JsonNode finishReason = firstCandidate.get("finishReason");
                if (finishReason != null && !"STOP".equals(finishReason.asText())) {
                    throw new RuntimeException("AI generation stopped unexpectedly: " + finishReason.asText());
                }

                JsonNode content = firstCandidate.get("content");

                if (content != null) {
                    JsonNode parts = content.get("parts");

                    if (parts != null && parts.isArray() && parts.size() > 0) {
                        JsonNode firstPart = parts.get(0);
                        JsonNode text = firstPart.get("text");

                        if (text != null) {
                            return text.asText();
                        }
                    }
                }
            }

            System.err.println("Unexpected response structure: " + response);
            throw new RuntimeException("Unexpected response format from Google AI Studio");

        } catch (Exception e) {
            System.err.println("Failed to parse response: " + response);
            throw new RuntimeException("Failed to parse Google AI Studio response: " + e.getMessage(), e);
        }
    }
}