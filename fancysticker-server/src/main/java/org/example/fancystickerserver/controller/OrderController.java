package org.example.fancystickerserver.controller;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.dto.OrderRequestDto;
import org.example.fancystickerserver.services.IOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")   
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService iOrderService;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDto orderRequestDto) {
        iOrderService.createOrder(orderRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Order Created Successfully");
    }
}
