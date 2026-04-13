package org.example.fancystickerserver.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.constants.ApplicationConstants;
import org.example.fancystickerserver.dto.ListAllOrdersResponseDto;
import org.example.fancystickerserver.dto.OrderDetailDto;
import org.example.fancystickerserver.dto.OrderItemDetailDto;
import org.example.fancystickerserver.dto.OrderRequestDto;
import org.example.fancystickerserver.entity.Customer;
import org.example.fancystickerserver.entity.Order;
import org.example.fancystickerserver.entity.OrderItem;
import org.example.fancystickerserver.entity.Product;
import org.example.fancystickerserver.exception.ResourceNotFoundException;
import org.example.fancystickerserver.repository.OrderRepository;
import org.example.fancystickerserver.repository.ProductRepository;
import org.example.fancystickerserver.services.IOrderService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImplementation implements IOrderService {

    private final OrderRepository orderRepository;
    private final ProfileServiceImplementation profileServiceImplementation;
    private final ProductRepository productRepository;

    @Override
    public void createOrder(OrderRequestDto orderRequestDto) {
        // get the customer
        Customer customer = profileServiceImplementation.getAuthenticatedCustomer();

        // create the order and set the customer reference
        Order order = new Order();
        order.setCustomer(customer);
        BeanUtils.copyProperties(orderRequestDto, order);
        order.setOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);

        // for each orderItem set the order, product reference
        List<OrderItem> orderItems = orderRequestDto.items().stream().map(item -> {
            OrderItem orderItem = new OrderItem();
            BeanUtils.copyProperties(item, orderItem);
            orderItem.setOrder(order);
            Product product =
                    productRepository.findById(item.productId()).orElseThrow(() -> new ResourceNotFoundException(
                            "Product", "ProductId", item.productId().toString()));
            orderItem.setProduct(product);
            orderItem.setPrice(item.price());
            orderItem.setQuantity(item.quantity());
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        orderRepository.save(order);  // we are not saving the orderItems explicitly because we have set the cascade type to ALL in the Order entity for the orderItems field. so when we save the order, it will automatically save the orderItems as well.
    }

    @Override
    public ListAllOrdersResponseDto getAllOrders() {
        // get the authenticated customer from security context
        Customer customer = profileServiceImplementation.getAuthenticatedCustomer();

        // fetch all orders for the customer with eager loading of order items
        List<Order> orders = orderRepository.findByCustomerOrderByCreatedAtDesc(customer);

        // map Order entities to OrderDetailDto DTOs
        return mapOrderDetailsToListAllOrderResponseDto(orders);
    }

    @Override
    public ListAllOrdersResponseDto getAllPendingOrders() {
        // get the orders whose status is "created" that means it is pending only.
        List<Order> orders = orderRepository.findByOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);
        return mapOrderDetailsToListAllOrderResponseDto(orders);
    }

    private ListAllOrdersResponseDto mapOrderDetailsToListAllOrderResponseDto(List<Order> orders) {
        List<OrderDetailDto> orderDetailDtos = orders.stream()
                .map(order -> new OrderDetailDto(
                        order.getOrderId(),
                        order.getTotalPrice(),
                        order.getPaymentStatus(),
                        order.getOrderStatus(),
                        order.getCreatedAt(),
                        order.getUpdatedAt(),
                        // map order items to OrderItemDetailDto
                        order.getOrderItems().stream()
                                .map(item -> new OrderItemDetailDto(
                                        item.getOrderItemId(),
                                        item.getProduct().getName(),
                                        item.getProduct().getImageUrl(),
                                        item.getQuantity(),
                                        item.getPrice()
                                ))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());

        // return wrapped response
        return new ListAllOrdersResponseDto(orderDetailDtos);
    }

    @Override
    public Order updateOrderStatus(Long orderId, String newStatus) {
        // get the order by id
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order", "OrderId", orderId.toString()));
        order.setOrderStatus(newStatus);
        return orderRepository.save(order);
    }
}
