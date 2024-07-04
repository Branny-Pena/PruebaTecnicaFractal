package com.pruebatecnicafractal.services.interfaces;

import com.pruebatecnicafractal.DTO.BuyOrderDTO;
import com.pruebatecnicafractal.model.BuyOrder;

import java.util.List;

public interface BuyOrderInterface {
    BuyOrder createOrder(BuyOrderDTO buyOrderDTO);
    BuyOrder updateOrder(BuyOrderDTO buyOrderDTO, Long orderId);
    void deleteOrder(Long productOrderId);
    BuyOrder getOrderById(Long productOrderId);
    List<BuyOrder> getAllOrders();
}
