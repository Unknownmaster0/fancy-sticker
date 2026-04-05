package org.example.fancystickerserver.controller;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.dto.PaymentIntentRequestDto;
import org.example.fancystickerserver.dto.PaymentIntentResponseDto;
import org.example.fancystickerserver.services.IPaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final IPaymentService iPaymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponseDto> createPaymentIntent(@RequestBody PaymentIntentRequestDto paymentIntentRequestDto) {
        //todo: Add one validation that if input amount is less than 50, then don't proceed with checkout.
        // 50 is our threshold order amount.
        PaymentIntentResponseDto responseDto = iPaymentService.createPaymentIntent(paymentIntentRequestDto);
        return ResponseEntity.ok(responseDto);
    }
}
