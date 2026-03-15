package org.example.fancystickerserver.services;

import org.example.fancystickerserver.dto.ProfileRequestDto;
import org.example.fancystickerserver.dto.ProfileResponseDto;

public interface IProfileService {
    ProfileResponseDto getProfile();
    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);
}
