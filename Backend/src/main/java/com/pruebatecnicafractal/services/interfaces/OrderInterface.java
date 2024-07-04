package com.pruebatecnicafractal.services.interfaces;

import com.pruebatecnicafractal.model.BuyOrder;

import java.util.List;

public interface OrderInterface {
    BuyOrder createOrder(BuyOrder buyOrder);
    BuyOrder updateOrder(BuyOrder buyOrder, Long orderId);
    void deleteOrder(Long productOrderId);
    BuyOrder getOrderById(Long productOrderId);
    List<BuyOrder> getAllOrders();
}
