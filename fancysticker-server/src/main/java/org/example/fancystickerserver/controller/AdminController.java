package org.example.fancystickerserver.controller;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.constants.ApplicationConstants;
import org.example.fancystickerserver.dto.AdminMessageResponseDto;
import org.example.fancystickerserver.dto.AdminOrderResponseDto;
import org.example.fancystickerserver.dto.ContactResponseDto;
import org.example.fancystickerserver.dto.ListAllOrdersResponseDto;
import org.example.fancystickerserver.entity.Contact;
import org.example.fancystickerserver.services.IContactService;
import org.example.fancystickerserver.services.IOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final IOrderService iOrderService;
    private final IContactService iContactService;

    @GetMapping("/orders")
    public ResponseEntity<ListAllOrdersResponseDto> getAllPendingOrders() {
        return ResponseEntity.ok().body(iOrderService.getAllPendingOrders());
    }

    @PatchMapping("/orders/{orderId}/confirm")
    public ResponseEntity<AdminOrderResponseDto> confirmOrder(@PathVariable String orderId) {
        iOrderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CONFIRMED);
        return ResponseEntity.ok().body(new AdminOrderResponseDto("200", "Order confirmed successfully"));
    }

    @PatchMapping("/orders/{orderId}/cancel")
    public ResponseEntity<AdminOrderResponseDto> cancelOrder(@PathVariable String orderId) {
        iOrderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CANCELLED);
        return ResponseEntity.ok().body(new AdminOrderResponseDto("200", "Order cancelled successfully"));
    }

    @GetMapping("/messages")
    public ResponseEntity<ContactResponseDto> getAllMessages() {
        ContactResponseDto responseDto = iContactService.getAllOpenMessages();
        return ResponseEntity.ok().body(responseDto);
    }

    @PatchMapping("/messages/{messageId}/close")
    public ResponseEntity<AdminMessageResponseDto> closeMessage(@PathVariable String messageId) {
        Contact message = iContactService.updateMessageStatus(messageId, ApplicationConstants.MESSAGE_STATUS_CLOSED);
        return ResponseEntity.ok().body(new AdminMessageResponseDto("200", "Message closed successfully", null, null,
                null, message.getId())); // message.getId() === messageId
    }
}
