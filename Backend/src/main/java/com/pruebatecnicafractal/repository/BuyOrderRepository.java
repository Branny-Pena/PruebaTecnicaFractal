package com.pruebatecnicafractal.repository;

import com.pruebatecnicafractal.model.BuyOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuyOrderRepository extends JpaRepository<BuyOrder, Long> {
}
