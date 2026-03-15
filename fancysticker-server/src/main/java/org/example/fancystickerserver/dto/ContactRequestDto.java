package org.example.fancystickerserver.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequestDto {
    @NotBlank(message = "Name should leave blank")
    @Size(min=3, max=100, message = "Size should be between 3 and 100")
    private String name;

    @NotBlank(message = "Email should leave blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Mobile Number should leave blank")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile Number should be 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Message should leave blank")
    @Size(min=10, max=500, message = "Size should be between 10 and 500")
    private String message;
}
