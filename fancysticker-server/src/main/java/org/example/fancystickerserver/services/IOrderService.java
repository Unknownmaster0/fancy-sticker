package org.example.fancystickerserver.services;

import org.example.fancystickerserver.dto.ListAllOrdersResponseDto;
import org.example.fancystickerserver.dto.OrderRequestDto;
import org.example.fancystickerserver.entity.Order;

public interface IOrderService {
    void createOrder(OrderRequestDto orderRequestDto);
    ListAllOrdersResponseDto getAllOrders();
    ListAllOrdersResponseDto getAllPendingOrders();
    Order updateOrderStatus(String orderId, String newStatus);
}
