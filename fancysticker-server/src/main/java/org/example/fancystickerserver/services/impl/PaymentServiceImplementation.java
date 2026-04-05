package org.example.fancystickerserver.services.impl;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.example.fancystickerserver.dto.PaymentIntentRequestDto;
import org.example.fancystickerserver.dto.PaymentIntentResponseDto;
import org.example.fancystickerserver.services.IPaymentService;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImplementation implements IPaymentService {
    @Override
    public PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(requestDto.amount())
                    .setCurrency(requestDto.currency())
                    .addPaymentMethodType("card")
                    .build();
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            return new PaymentIntentResponseDto(paymentIntent.getClientSecret());
        } catch (StripeException e) {
            throw new RuntimeException("Fail to process payment: " + e.getMessage());
        }
    }
}
