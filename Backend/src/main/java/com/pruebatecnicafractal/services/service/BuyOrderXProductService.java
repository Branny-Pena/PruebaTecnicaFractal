package com.pruebatecnicafractal.services.service;

import com.pruebatecnicafractal.exception.BuyOrderXProductNotFoundException;
import com.pruebatecnicafractal.model.BuyOrderXProduct;
import com.pruebatecnicafractal.repository.BuyOrderXProductRepository;
import com.pruebatecnicafractal.services.interfaces.BuyOrderXProductInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyOrderXProductService implements BuyOrderXProductInterface {
    private final BuyOrderXProductRepository buyOrderXProductRepository;

    @Override
    public BuyOrderXProduct addOrderXProduct(BuyOrderXProduct buyOrderXProduct) {
        return buyOrderXProductRepository.save(buyOrderXProduct);
    }

    @Override
    public List<BuyOrderXProduct> getAllOrderXProducts() {
        return buyOrderXProductRepository.findAll();
    }

    @Override
    public void deleteOrderXProduct(Long buyOrderProduct_id) {
        buyOrderXProductRepository.findById(buyOrderProduct_id).map(buyOrd -> {
            buyOrd.setActive(false);
            return buyOrderXProductRepository.save(buyOrd);
        }).orElseThrow(() -> new BuyOrderXProductNotFoundException("BuyOrderXProduct not found " + buyOrderProduct_id));
    }

    @Override
    public BuyOrderXProduct updateOrderXProduct(BuyOrderXProduct buyOrderXProduct, Long buyOrderProduct_id) {
        return buyOrderXProductRepository.findById(buyOrderProduct_id).map(buyOrd -> {
            buyOrd.setBuyOrder(buyOrderXProduct.getBuyOrder());
            buyOrd.setProduct(buyOrderXProduct.getProduct());
            buyOrd.setPrice(buyOrderXProduct.getPrice());
            buyOrd.setQuantity(buyOrderXProduct.getQuantity());
            buyOrd.setActive(true);
            return buyOrderXProductRepository.save(buyOrd);
        }).orElseThrow(() -> new BuyOrderXProductNotFoundException("BuyOrderXProduct not found " + buyOrderProduct_id));
    }
}
