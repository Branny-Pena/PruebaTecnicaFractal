package com.pruebatecnicafractal.services.service;

import com.pruebatecnicafractal.exception.ProductNotFoundException;
import com.pruebatecnicafractal.model.Product;
import com.pruebatecnicafractal.repository.ProductRepository;
import com.pruebatecnicafractal.services.interfaces.ProductInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService implements ProductInterface {
    private final ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(() ->
                new ProductNotFoundException("Product not found " + productId));
    }

    @Override
    public Product updateProduct(Product product, Long productId) {
        return productRepository.findById(productId).map(prod -> {
            prod.setName(product.getName());
            prod.setPrice(product.getPrice());
            prod.setDescription(product.getDescription());
            return productRepository.save(prod);
        }).orElseThrow(() -> new ProductNotFoundException("Product not found " + productId));
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.findById(productId).map(prod -> {
            prod.setActive(false);
            return productRepository.save(prod);
        }).orElseThrow(() -> new ProductNotFoundException("Product not found " + productId));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
