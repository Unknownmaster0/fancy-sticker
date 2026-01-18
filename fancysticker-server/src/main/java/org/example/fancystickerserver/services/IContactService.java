package org.example.fancystickerserver.services;

import org.example.fancystickerserver.dto.ContactRequestDto;

public interface IContactService {
    boolean saveContact(ContactRequestDto contactRequestDto);
}
