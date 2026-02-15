package org.example.fancystickerserver.dto;

public record LoginResponseDto(String message, UserDto user, String jwtToken) {
}
