package com.example.exception;

public class NoActiveSubscribeException extends Exception{
    public NoActiveSubscribeException() {
        super("Нет активной подписки сбп");
    }
}
