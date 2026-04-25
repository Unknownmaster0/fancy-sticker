package org.example.fancystickerserver.dto;

import java.math.BigDecimal;

public record OrderItemDto(String productId, Integer quantity, BigDecimal price) {
}
