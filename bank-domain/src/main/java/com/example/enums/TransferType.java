package com.example.enums;

public enum TransferType {
    RECEIVE_STATUS("RECEIVE"),
    SEND_STATUS("SEND");

    private final String text;

    TransferType (final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
