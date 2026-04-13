package org.example.fancystickerserver.dto;

import java.util.List;

public record ContactResponseDto(List<ContactDetailsDto> contacts) {
}
