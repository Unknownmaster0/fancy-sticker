package org.example.fancystickerserver.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.constants.ApplicationConstants;
import org.example.fancystickerserver.dto.ContactDetailsDto;
import org.example.fancystickerserver.dto.ContactRequestDto;
import org.example.fancystickerserver.dto.ContactResponseDto;
import org.example.fancystickerserver.entity.Contact;
import org.example.fancystickerserver.exception.ResourceNotFoundException;
import org.example.fancystickerserver.repository.ContactRepository;
import org.example.fancystickerserver.services.IContactService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

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
            contact.setStatus(ApplicationConstants.MESSAGE_STATUS_OPEN);
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

    @Override
    public Contact updateMessageStatus(Long messageId, String newStatus) {
        Contact contact = contactRepository.findById(messageId).orElseThrow(() -> new ResourceNotFoundException(
                "Contact", "MessageId", messageId.toString()));
        contact.setStatus(newStatus);
        return contactRepository.save(contact);
    }

    // contact <---> message

    @Override
    public ContactResponseDto getAllOpenMessages() {
        List<Contact> contacts = contactRepository.findByStatus(ApplicationConstants.MESSAGE_STATUS_OPEN);

        // map all the contacts according to the contactResponseDto
        return new ContactResponseDto(contacts.stream().map(this::mapContactsToContactResponseDto).collect(Collectors.toList()));
    }

    private ContactDetailsDto mapContactsToContactResponseDto(Contact contact) {
        return new ContactDetailsDto(contact.getId(), contact.getName(), contact.getEmail(), contact.getMessage(),
                contact.getMobileNumber(), contact.getStatus(), contact.getCreatedAt());
    }
}
