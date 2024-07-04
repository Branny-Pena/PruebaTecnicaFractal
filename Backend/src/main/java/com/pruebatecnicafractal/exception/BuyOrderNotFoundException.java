package com.pruebatecnicafractal.exception;

public class BuyOrderNotFoundException extends RuntimeException {
    public BuyOrderNotFoundException(String message) {
        super(message);
    }
}
