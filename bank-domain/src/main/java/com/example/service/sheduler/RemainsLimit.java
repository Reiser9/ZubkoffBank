package com.example.service.sheduler;

import com.example.model.Card;
import com.example.repository.CardRepository;
import com.example.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@EnableScheduling
public class RemainsLimit {
    @Autowired
    private CardRepository cardRepository;
    @Scheduled(cron = "@monthly")
//    @Scheduled(fixedDelay = 60 * 1000)
    @Async
    public void resetLimit() {
        List<Card> cards = cardRepository.findAllByRemainsLimitNotEqualsTypeLimit();
        for (Card card: cards) {
            card.setRemainsLimit(card.getType().getLimit());
            cardRepository.save(card);
        }
    }
}
