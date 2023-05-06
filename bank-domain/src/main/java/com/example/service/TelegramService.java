package com.example.service;


import com.example.config.BotConfig;
import com.example.enums.CodeType;
import com.example.model.Code;
import com.example.model.User;
import com.example.repository.CodeRepository;
import com.example.repository.UserRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.commands.SetMyCommands;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.commands.BotCommand;
import org.telegram.telegrambots.meta.api.objects.commands.scope.BotCommandScopeDefault;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


@Component
public class TelegramService extends TelegramLongPollingBot {
    final BotConfig config;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CodeRepository codeRepository;


    public TelegramService(BotConfig config) {
        this.config = config;
        List<BotCommand> commands = new ArrayList<>();
        commands.add(new BotCommand("/start", "Привязать свой телеграмм аккаунт"));
        try {
            this.execute(new SetMyCommands(commands, new BotCommandScopeDefault(), null));
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {
        if (update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            switch (messageText) {
                case "/start":
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setChatId(String.valueOf(update.getMessage().getChatId()));
                    sendMessage.setText("Отправьте номер телефона");

                    // create keyboard
                    ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
                    sendMessage.setReplyMarkup(replyKeyboardMarkup);
                    replyKeyboardMarkup.setSelective(true);
                    replyKeyboardMarkup.setResizeKeyboard(true);
                    replyKeyboardMarkup.setOneTimeKeyboard(true);

                    // new list
                    List<KeyboardRow> keyboard = new ArrayList<>();

                    // first keyboard line
                    KeyboardRow keyboardFirstRow = new KeyboardRow();
                    KeyboardButton keyboardButton = new KeyboardButton();
                    keyboardButton.setText("Подтвердить");
                    keyboardButton.setRequestContact(true);
                    keyboardFirstRow.add(keyboardButton);

                    // add array to list
                    keyboard.add(keyboardFirstRow);

                    // add list to our keyboard
                    replyKeyboardMarkup.setKeyboard(keyboard);
                    executeMessage(sendMessage);
                    break;
            }

        }
        if (update.getMessage().hasContact()) {
            setChatIdAndPhoneNum(update.getMessage().getChatId(), update.getMessage().getContact().getPhoneNumber());
        }

    }

    private void executeMessage(SendMessage message){
        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    public boolean sendCode(String phoneNum, String typeCode) throws TelegramApiException {
        if (isExist(phoneNum, false)) {
            int code = generateCode();
            String message = "";
            if (typeCode.equals(String.valueOf(CodeType.RECOVERY))) {
                message = String.format("Код для восстановления пароля: %06d", code);
            }
            else if (typeCode.equals(String.valueOf(CodeType.REGISTER))) {
                message = String.format("Код для регистрации: %06d", code);
            }
            else {
                message = String.format("Код для подтверждения транзакции: %06d", code);
            }
            SendMessage sendMessage = new SendMessage();
            sendMessage.setChatId(getChatIdByPhoneNumber(phoneNum));
            sendMessage.setText(message);

            execute(sendMessage);
            saveCode(phoneNum, code, typeCode);
            return true;
        }
        return false;
    }

    public Boolean compareCode(String phoneNumber, int checkCode, String type) {
        Long id = userRepository.findByPhoneNum(phoneNumber).getId();
        List<Code> codes = codeRepository.findByUserId(id);
        Code code = codes.stream().filter(e -> e.getType().equals(type)).findFirst().orElse(new Code());
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
        Timestamp date = new Timestamp(cal.getTime().getTime());
        if (code.getCode() == checkCode && date.before(code.getExpDate()) && !code.getUsed()) {
            return true;
        }
        return false;
    }

    private boolean isExist(String phoneNum, boolean isMessageOutput) throws TelegramApiException {
        User regUser = userRepository.findByPhoneNum(phoneNum);
        if (regUser != null)
        {
            if (isMessageOutput) {
                SendMessage sendMessage = new SendMessage();
                sendMessage.setChatId(getChatIdByPhoneNumber(phoneNum));
                sendMessage.setText("Данный телеграм аккаунт уже привязан");
                execute(sendMessage);
            }
            return true;
        }
        return false;
    }

    private void setChatIdAndPhoneNum(Long groupId, String phoneNum) throws TelegramApiException {
        try {
            if (!phoneNum.startsWith("+")) {
                phoneNum = "+" + phoneNum;
            }
            if (!isExist(phoneNum, true))
            {
                User user = new User();
                user.setPhoneNum(phoneNum);
                user.setGroupId(Long.valueOf(groupId));
                userRepository.save(user);
                String message = "Вы успешно привязали номер телефона";
                SendMessage sendMessage = new SendMessage();
                sendMessage.setChatId(String.valueOf(groupId));
                sendMessage.setText(message);
                executeMessage(sendMessage);
            }
        }
        catch (TelegramApiException exception) {
            exception.printStackTrace();
        }


    }

    private String getChatIdByPhoneNumber(String phoneNumber) {
        return String.valueOf(userRepository.findByPhoneNum(phoneNumber).getGroupId());
    }

    private void saveCode(String phoneNumber, int checkCode, String typeCode) {
        User user = userRepository.findByPhoneNum(phoneNumber);
        List<Code> codes = user.getCodes();
        Code code = codes.stream().filter(e -> e.getType().equals(typeCode)).findFirst().orElse(new Code());
        code.setCode(checkCode);
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
        cal.add(Calendar.MINUTE, 10);
        Timestamp date = new Timestamp(cal.getTime().getTime());
        code.setExpDate(date);
        code.setType(typeCode);
        code.setUsed(false);
        codes.add(code);
        user.setCodes(codes);
        userRepository.save(user);
    }

    private int generateCode() {
        // Генерация 6-значного кода
        return (int) (Math.random() * 900000) + 100000;
    }

    @Override
    public String getBotUsername() {
        return config.getBotName();
    }

    @Override
    public String getBotToken() {
        return config.getToken();
    }

    @Override
    public void onRegister() {
        super.onRegister();
    }


}