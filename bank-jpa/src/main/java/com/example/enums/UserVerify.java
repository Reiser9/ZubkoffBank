package com.example.enums;

public enum UserVerify {
    FIRST_STATUS("NOT VERIFIED"),
    SECOND_STATUS("PROCCESS"),
    THIRD_STATUS("VERIFIED");

    private final String text;

    UserVerify (final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
