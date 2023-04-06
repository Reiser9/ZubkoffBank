package com.example.exception;

public class UnknownRecipientException extends Exception {
    public UnknownRecipientException() {
        super("Неизвестный получатель");
    }
}
