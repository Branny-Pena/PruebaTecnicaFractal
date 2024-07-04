package com.pruebatecnicafractal.services.service;

import com.pruebatecnicafractal.DTO.BuyOrderDTO;
import com.pruebatecnicafractal.exception.BuyOrderNotFoundException;
import com.pruebatecnicafractal.model.BuyOrder;
import com.pruebatecnicafractal.model.BuyOrderXProduct;
import com.pruebatecnicafractal.model.Product;
import com.pruebatecnicafractal.repository.BuyOrderRepository;
import com.pruebatecnicafractal.services.interfaces.BuyOrderInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BuyOrderService implements BuyOrderInterface {
    private final BuyOrderRepository buyOrderRepository;
    private final BuyOrderXProductService buyOrderXProductService;

    @Override
    public BuyOrder createOrder(BuyOrderDTO buyOrderDTO) {
        BuyOrder buyOrder = new BuyOrder();
        buyOrder.setDate(new Date());

        Set<BuyOrderXProduct> buyOrderXProducts = new HashSet<>();
        double finalPrice = 0.0;
        int numberOfProducts = 0;

        for (BuyOrderDTO.BuyOrderXProductDTO buyOrderXProductDTO : buyOrderDTO.getBuyOrdersProduct()) {
            BuyOrderXProduct buyOrderXProduct = new BuyOrderXProduct();
            Product product = buyOrderXProductDTO.getProduct();

            buyOrderXProduct.setProduct(product);
            buyOrderXProduct.setBuyOrder(buyOrder);
            buyOrderXProduct.setQuantity(buyOrderXProductDTO.getQuantity());
            buyOrderXProduct.setPrice(product.getPrice()*buyOrderXProductDTO.getQuantity());
            buyOrderXProduct.setActive(true);

            buyOrderXProducts.add(buyOrderXProduct);

            finalPrice += buyOrderXProduct.getPrice() * buyOrderXProduct.getQuantity();
            numberOfProducts += buyOrderXProduct.getQuantity();
        }

        buyOrder.setFinalPrice(finalPrice);
        buyOrder.setNumberOfProducts(numberOfProducts);
        buyOrder.setBuyOrdersProduct(buyOrderXProducts);

        buyOrder = buyOrderRepository.save(buyOrder);

        for (BuyOrderXProduct buyOrderXProduct : buyOrderXProducts) {
            buyOrderXProduct.setBuyOrder(buyOrder);
        }

        for (BuyOrderXProduct buyOrderXProduct : buyOrderXProducts) {
            buyOrderXProductService.addOrderXProduct(buyOrderXProduct);
        }

        return buyOrder;
    }

    @Override
    public BuyOrder updateOrder(BuyOrderDTO buyOrderDTO, Long buyOrderId) {
        Optional<BuyOrder> optionalBuyOrder = buyOrderRepository.findById(buyOrderId);
        if (optionalBuyOrder.isEmpty()) {
            throw new BuyOrderNotFoundException("Buy order not found" + buyOrderId);
        }
        BuyOrder buyOrder = optionalBuyOrder.get();

        buyOrder.setDate(new Date());

        Set<BuyOrderXProduct> buyOrderXProducts = new HashSet<>();
        double finalPrice = 0.0;
        int numberOfProducts = 0;

        for (BuyOrderDTO.BuyOrderXProductDTO buyOrderXProductDTO : buyOrderDTO.getBuyOrdersProduct()) {
            BuyOrderXProduct buyOrderXProduct = new BuyOrderXProduct();
            Product product = buyOrderXProductDTO.getProduct();

            buyOrderXProduct.setProduct(product);
            buyOrderXProduct.setBuyOrder(buyOrder);
            buyOrderXProduct.setQuantity(buyOrderXProductDTO.getQuantity());
            buyOrderXProduct.setPrice(product.getPrice()*buyOrderXProductDTO.getQuantity());
            buyOrderXProduct.setActive(true);

            buyOrderXProducts.add(buyOrderXProduct);

            finalPrice += buyOrderXProduct.getPrice() * buyOrderXProduct.getQuantity();
            numberOfProducts += buyOrderXProduct.getQuantity();
        }

        buyOrder.setFinalPrice(finalPrice);
        buyOrder.setNumberOfProducts(numberOfProducts);
        buyOrder.setBuyOrdersProduct(buyOrderXProducts);

        buyOrder = buyOrderRepository.save(buyOrder);

        for (BuyOrderXProduct buyOrderXProduct : buyOrderXProducts) {
            buyOrderXProductService.updateOrderXProduct(buyOrderXProduct, buyOrderXProduct.getBuyOrderProduct_id());
        }

        return buyOrder;
    }

    @Override
    public void deleteOrder(Long orderId) {
    }

    @Override
    public BuyOrder getOrderById(Long orderId) {
        return buyOrderRepository.findById(orderId).orElseThrow(() ->
                new BuyOrderNotFoundException("Buy order not found " + orderId));
    }

    @Override
    public List<BuyOrder> getAllOrders() {
        return buyOrderRepository.findAll();
    }
}
