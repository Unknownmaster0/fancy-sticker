package org.example.fancystickerserver.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.fancystickerserver.dto.ProductDto;
import org.example.fancystickerserver.entity.Product;
import org.example.fancystickerserver.repository.ProductRepository;
import org.example.fancystickerserver.services.IProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImplementation implements IProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::transformToProductDto)
                .toList();
    }

    private ProductDto transformToProductDto(Product product) {
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto); // it works when the name of the fields are the same
        return productDto;
    }
}
