package org.example.fancystickerserver.dto;

import java.math.BigDecimal;

public record OrderItemDetailDto(
    Long orderItemId,
    String productName,
    String productImageUrl,
    Integer quantity,
    BigDecimal price
) {
}

