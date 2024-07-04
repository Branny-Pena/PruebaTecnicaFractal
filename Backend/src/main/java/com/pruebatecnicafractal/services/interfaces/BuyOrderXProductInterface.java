package com.pruebatecnicafractal.services.interfaces;


import com.pruebatecnicafractal.model.BuyOrderXProduct;
import com.pruebatecnicafractal.model.Product;

import java.util.List;

public interface BuyOrderXProductInterface {
    BuyOrderXProduct addOrderXProduct(BuyOrderXProduct buyOrderXProduct);
    List<BuyOrderXProduct> getAllOrderXProducts();
    void deleteOrderXProduct(Long buyOrderProduct_id);
    BuyOrderXProduct updateOrderXProduct(BuyOrderXProduct buyOrderXProduct, Long buyOrderProduct_id);

}
