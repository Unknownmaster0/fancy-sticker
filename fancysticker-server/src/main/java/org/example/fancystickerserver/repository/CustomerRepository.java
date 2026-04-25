package org.example.fancystickerserver.repository;

import org.example.fancystickerserver.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Optional<Customer> findByEmail(String email);
    Optional<Customer> findByEmailOrMobileNumber(String email, String mobileNumber);
}
