package org.example.fancystickerserver.services;

import org.example.fancystickerserver.dto.ContactRequestDto;
import org.example.fancystickerserver.dto.ContactResponseDto;
import org.example.fancystickerserver.entity.Contact;

import java.util.List;

public interface IContactService {
    boolean saveContact(ContactRequestDto contactRequestDto);
    Contact updateMessageStatus(Long messageId, String newStatus);
    ContactResponseDto getAllOpenMessages();
}
