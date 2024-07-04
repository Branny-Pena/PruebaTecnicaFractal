package com.pruebatecnicafractal.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BuyOrderXProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyOrderProduct_id;
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "buyOrder_id")
    @JsonBackReference
    private BuyOrder buyOrder;
}
