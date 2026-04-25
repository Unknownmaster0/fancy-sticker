package org.example.fancystickerserver.dto;

import java.time.Instant;

public record ContactDetailsDto(String id, String name, String email, String message, String mobileNumber,
                                String status, Instant createdAt) {
}
