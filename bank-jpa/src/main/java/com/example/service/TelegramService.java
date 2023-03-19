package com.example.service;


import com.example.model.Code;
import com.example.model.User;
import com.example.repository.CardRepository;
import com.example.repository.CodeRepository;
import com.example.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Service
public class TelegramService extends TelegramLongPollingBot {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CodeRepository codeRepository;
    @Value("telegram.bot.username")
    private String botUsername;
    @Value("telegram.bot.token")
    private String botToken;
    @Value("telegram.regExp")
    private String expTime;

    @Override
    public void onUpdateReceived(Update update) {
        update.getMessage().hasContact();
        if (update.getMessage().getText().equals("/start")) {
            if (update.hasMessage() && update.getMessage().hasContact()) {
                setChatIdAndPhoneNum(
                        update.getMessage().getChatId(),
                        update.getMessage().getContact().getPhoneNumber()
                );
            }
        }

    }

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }

    public void sendCode(String phoneNumber, String typeCode) {
        int code = generateCode();
        String message = String.format("Ваш 6-значный код: %06d", code);

        SendMessage sendMessage = new SendMessage()
                .setChatId(getChatIdByPhoneNumber(phoneNumber))
                .setText(message);
        try {
            execute(sendMessage);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
        saveCode(phoneNumber, code, typeCode);
    }

    public Boolean checkCode(String phoneNumber, int code) {
        Long id = userRepository.findByPhoneNum(phoneNumber).getId();
        if (codeRepository.findByUserId(id).getCode() == code) {
            return true;
        }
        return false;
    }

    private void setChatIdAndPhoneNum(Long groupId, String numberPhone) {
        User user = userRepository.findByPhoneNum(numberPhone);
        user.setGroupId(groupId);
        userRepository.save(user);
    }

    private long getChatIdByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNum(phoneNumber).getGroupId();
    }

    private void saveCode(String phoneNumber, int checkCode, String typeCode) {
        List<Code> codes = userRepository.findByPhoneNum(phoneNumber).getCodes();
        Code code = new Code();
        code.setCode(checkCode);
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
        cal.add(Calendar.MINUTE, 10);
        Timestamp date = new Timestamp(cal.getTime().getTime());
        code.setExpDate(date);
        code.setType(typeCode);
        codes.add(code);
        codeRepository.save(code);
    }

    private int generateCode() {
        // Генерация 6-значного кода
        return (int) (Math.random() * 900000) + 100000;
    }

    public enum type {
        REGISTER,
        RECOVERY,
        TRANSFER
    }


}