package org.example.fancystickerserver.dto;

public record PaymentIntentRequestDto(Long amount, String currency) {
}
