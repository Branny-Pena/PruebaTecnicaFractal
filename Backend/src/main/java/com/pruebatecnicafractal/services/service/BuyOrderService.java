package com.pruebatecnicafractal.services.service;

import com.pruebatecnicafractal.model.BuyOrder;
import com.pruebatecnicafractal.services.interfaces.OrderInterface;

import java.util.List;

public class BuyOrderService implements OrderInterface {
    @Override
    public BuyOrder createOrder(BuyOrder buyOrder) {
        return null;
    }

    @Override
    public BuyOrder updateOrder(BuyOrder buyOrder, Long orderId) {
        return null;
    }

    @Override
    public void deleteOrder(Long orderId) {

    }

    @Override
    public BuyOrder getOrderById(Long orderId) {
        return null;
    }

    @Override
    public List<BuyOrder> getAllOrders() {
        return List.of();
    }
}
