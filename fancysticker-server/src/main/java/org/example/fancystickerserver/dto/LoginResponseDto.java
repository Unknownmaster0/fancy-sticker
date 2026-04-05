package org.example.fancystickerserver.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginResponseDto {
    private String message;
    private UserDto user;
    private String jwtToken;
}
