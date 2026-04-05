package org.example.fancystickerserver.controller;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.dto.ProfileRequestDto;
import org.example.fancystickerserver.dto.ProfileResponseDto;
import org.example.fancystickerserver.services.IProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final IProfileService iProfileService;

    @GetMapping
    public ResponseEntity<ProfileResponseDto> getUserProfile() {
        ProfileResponseDto responseDto = iProfileService.getProfile();
        return ResponseEntity.ok().body(responseDto);
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDto> updateUserProfile(@Validated @RequestBody ProfileRequestDto profileRequestDto) {
        ProfileResponseDto responseDto = iProfileService.updateProfile(profileRequestDto);
        return ResponseEntity.ok().body(responseDto);
    }
}
