package org.example.fancystickerserver.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.fancystickerserver.entity.Order;

import java.util.List;

@Getter @Setter
public class OrderResponseDto {
    List<Order> orders;
}
