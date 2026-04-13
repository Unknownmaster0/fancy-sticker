package org.example.fancystickerserver.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderDetailDto(
    Long orderId,
    BigDecimal totalPrice,
    String paymentStatus,
    String orderStatus,
    Instant createdAt,
    Instant updatedAt,
    List<OrderItemDetailDto> orderItems
) {
}

