package com.example.main.service;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;


@Getter
@Setter
@Service
public class TelegramBot extends TelegramLongPollingBot {
    @Value("telegram.bot.username")
    private String botUsername;
    @Value("telegram.bot.token")
    private String botToken;

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            String chatId = update.getMessage().getChatId().toString();

            if ("/start".equals(messageText)) {
                sendMessage(chatId, "Привет! Я могу отправлять информацию по номеру телефона.");
            } else {
                sendMessage(chatId, "Я не понимаю, что вы говорите.");
            }
        }
    }

    private void sendMessage(String chatId, String text) {
        SendMessage message = new SendMessage()
                .setChatId(chatId)
                .setText(text);

        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

}