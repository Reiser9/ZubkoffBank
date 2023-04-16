package com.example.enums;

public enum UserVerify {
    NOT_VERIFIED_STATUS("NOT VERIFIED"),
    PROCESS_STATUS("PROCESS"),
    VERIFIED_STATUS("VERIFIED"),
    REFUSED_STATUS("REFUSED");

    private final String text;

    UserVerify (final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
