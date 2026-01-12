package org.example.fancystickerserver.services;

import org.example.fancystickerserver.dto.ProductDto;

import java.util.List;

public interface IProductService {
    List<ProductDto> getProducts();
}
