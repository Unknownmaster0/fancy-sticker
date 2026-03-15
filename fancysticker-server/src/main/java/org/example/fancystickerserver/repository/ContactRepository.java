package org.example.fancystickerserver.repository;

import org.example.fancystickerserver.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
