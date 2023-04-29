package com.example.enums;

public enum TransferStatus {
    SUCCESSFULLY_STATUS("SUCCESSFUL"),
    PROCESS_STATUS("PROCESS"),
    NOT_SUCCESSFULLY_STATUS("NOT SUCCESSFUL");

    private final String text;

    TransferStatus (final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
