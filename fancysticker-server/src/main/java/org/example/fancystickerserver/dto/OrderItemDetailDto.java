package org.example.fancystickerserver.dto;

import java.math.BigDecimal;

public record OrderItemDetailDto(
    String orderItemId,
    String productName,
    String productImageUrl,
    Integer quantity,
    BigDecimal price
) {
}

