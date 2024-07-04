package com.pruebatecnicafractal.services.interfaces;

import com.pruebatecnicafractal.model.Product;

import java.util.List;

public interface ProductInterface {
    Product addProduct(Product product);
    Product getProductById(Long productId);
    Product updateProduct(Product product, Long productId);
    void deleteProduct(Long productId);
    List<Product> getAllProducts();
}
