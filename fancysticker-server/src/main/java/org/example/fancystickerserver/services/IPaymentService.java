package org.example.fancystickerserver.services;

import org.example.fancystickerserver.dto.PaymentIntentRequestDto;
import org.example.fancystickerserver.dto.PaymentIntentResponseDto;

public interface IPaymentService {
    PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto);
}
