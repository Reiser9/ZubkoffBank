package com.example.exception;

public class InsufficientFundsException extends Exception {
    public InsufficientFundsException() {
        super("Недостаточно средств");
    }
}
