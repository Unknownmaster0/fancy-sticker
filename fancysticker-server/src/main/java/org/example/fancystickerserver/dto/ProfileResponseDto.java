package org.example.fancystickerserver.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProfileResponseDto {
//    private Long customerId;
//    private String name;
//    private String email;
//    private String mobileNumber;
//    private AddressDto addressDto;
    private UserDto user;
    private boolean emailUpdated;
}
