package com.example.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
@Data
public class BotConfig {

    @Value("${telegram.bot.username}")
    String botName;

    @Value("${telegram.bot.token}")
    String token;

    @Value("telegram.bot.codeExp")
    private String expTime;
}
