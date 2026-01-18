package org.example.fancystickerserver.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.dto.ContactRequestDto;
import org.example.fancystickerserver.entity.Contact;
import org.example.fancystickerserver.repository.ContactRepository;
import org.example.fancystickerserver.services.IContactService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ContactServiceImplementation implements IContactService {

    private final ContactRepository contactRepository;

    @Override
    public boolean saveContact(ContactRequestDto contactRequestDto) {
        try {
            Contact contact = transformToEntity(contactRequestDto);
            contact.setCreatedAt(Instant.now());
            contact.setCreatedBy(contactRequestDto.getName());
            contactRepository.save(contact);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // yaha request aa rha hai dto ke format mee. then usko wapas se object ke
    // form me convert karna hai.
    private Contact transformToEntity(ContactRequestDto contactRequestDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactRequestDto, contact); // it works when the name of the fields are the same
        return contact;
    }
}
