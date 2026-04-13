package org.example.fancystickerserver.repository;

import org.example.fancystickerserver.entity.Customer;
import org.example.fancystickerserver.entity.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);
    List<Order> findByOrderStatus (String orderStatus);
}
