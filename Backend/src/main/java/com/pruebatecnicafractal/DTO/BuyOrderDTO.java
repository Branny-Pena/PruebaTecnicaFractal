package com.pruebatecnicafractal.DTO;

import com.pruebatecnicafractal.model.Product;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BuyOrderDTO {
    private List<BuyOrderXProductDTO> buyOrdersProduct;

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BuyOrderXProductDTO {
        private Product product;
        private Integer quantity;
    }
}
