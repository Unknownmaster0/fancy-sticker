package org.example.fancystickerserver.services;

import org.example.fancystickerserver.dto.OrderRequestDto;

public interface IOrderService {
    void createOrder(OrderRequestDto orderRequestDto);
}
