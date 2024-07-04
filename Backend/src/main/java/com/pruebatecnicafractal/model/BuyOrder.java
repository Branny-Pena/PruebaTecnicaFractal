package com.pruebatecnicafractal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyOrderId;

    @Temporal(TemporalType.DATE)
    private Date date;
    private Integer numberOfProducts;
    private Double finalPrice;

    @OneToMany(mappedBy = "buyOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<BuyOrderXProduct> buyOrdersProduct;
}
