package org.example.fancystickerserver.dto;

import java.util.List;

public record ListAllOrdersResponseDto(List<OrderDetailDto> orders) {
}

