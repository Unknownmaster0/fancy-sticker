package org.example.fancystickerserver.dto;

public record AdminMessageResponseDto(String statusCode, String message, String name, String email,
                                      String mobileNumber, String contactId) {
}
