package com.pruebatecnicafractal.controller;

import com.pruebatecnicafractal.model.Product;
import com.pruebatecnicafractal.services.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.FOUND);
    }

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @PutMapping("/update/{productId}")
    public Product updateProduct(@RequestBody Product product, @PathVariable Long productId) {
        return productService.updateProduct(product, productId);
    }

    @DeleteMapping("/delete/{productId}")
    public void deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
    }
}
