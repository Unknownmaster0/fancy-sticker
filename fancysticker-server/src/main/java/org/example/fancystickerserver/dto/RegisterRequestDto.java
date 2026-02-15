package org.example.fancystickerserver.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDto {
    @NotBlank(message = "Name should not be blank")
    @Size(min = 3, max = 30, message = "Name should contain at least 3 characters")
    private String name;

    @NotBlank(message = "Email should not be blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Mobile number should not be blank")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number should contain exactly 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Password should not be blank")
    @Size(min = 8, max = 20, message = "Password should contain at least 8 and at most 20 characters")
    private String password;
}
