package org.example.fancystickerserver.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

/**
 * DTO for returning order details to the client.
 *
 * Excluded fields:
 * - customerId (no need to expose internal customer reference)
 * - paymentId (sensitive payment information)
 * - createdBy, updatedBy (internal audit fields)
 */
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

