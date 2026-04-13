package org.example.fancystickerserver.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProfileResponseDto {
    private UserDto user;
    private boolean emailUpdated;
}
