package org.example.fancystickerserver.dto;

import java.math.BigDecimal;

/**
 * DTO for returning order item details to the client.
 *
 * Included fields:
 * - orderItemId: unique identifier for the order item
 * - productName: product name (requires product details)
 * - productImageUrl: product image (requires product details)
 * - quantity: number of items ordered
 * - price: price per unit at the time of order
 *
 * Excluded fields:
 * - orderId (not needed as it's parent context)
 * - createdAt, createdBy, updatedAt, updatedBy (internal audit fields)
 */
public record OrderItemDetailDto(
    Long orderItemId,
    String productName,
    String productImageUrl,
    Integer quantity,
    BigDecimal price
) {
}

