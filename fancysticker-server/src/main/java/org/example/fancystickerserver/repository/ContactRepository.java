package org.example.fancystickerserver.repository;

import org.example.fancystickerserver.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, String> {
    List<Contact> findByStatus(String status);
}
