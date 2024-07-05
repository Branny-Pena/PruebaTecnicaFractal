package com.pruebatecnicafractal.controller;

import com.pruebatecnicafractal.DTO.BuyOrderDTO;
import com.pruebatecnicafractal.model.BuyOrder;
import com.pruebatecnicafractal.services.service.BuyOrderService;
import com.pruebatecnicafractal.services.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/buyOrders")
@RequiredArgsConstructor
public class BuyOrderController {
    private final BuyOrderService buyOrderService;
    private final ProductService productService;

    @PostMapping
    public BuyOrder createOrder(@RequestBody BuyOrderDTO buyOrderDTO) {
        return buyOrderService.createOrder(buyOrderDTO);
    }

    @GetMapping
    public ResponseEntity<List<BuyOrder>> getAllOrders() {
        return new ResponseEntity<>(buyOrderService.getAllOrders(), HttpStatus.FOUND);
    }

    @GetMapping("/{buyOrderId}")
    public BuyOrder getOrderById(@PathVariable Long buyOrderId){
        return buyOrderService.getOrderById(buyOrderId);
    }

    @PutMapping("/{buyOrderId}")
    public BuyOrder updateOrder(@PathVariable Long buyOrderId, @RequestBody BuyOrderDTO buyOrderDTO){
        return buyOrderService.updateOrder(buyOrderDTO, buyOrderId);
    }

    @DeleteMapping("/{buyOrderId}")
    public void deleteOrder(@PathVariable Long buyOrderId){
        buyOrderService.deleteOrder(buyOrderId);
    }
}
