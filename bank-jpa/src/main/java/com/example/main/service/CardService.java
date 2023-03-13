package com.example.main.service;

import com.example.main.model.Card;
import com.example.main.repository.CardRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
@AllArgsConstructor
public class CardService {

    @Autowired
    private CardRepository cardRepository;


    public List<Card> findCardByUserId(Long id) {
        return cardRepository.findByUserId(id);
    }

    public Card findCardByCardNum(String cardNum) {
        return cardRepository.findByCardNum(cardNum);
    }

    public void save(Card card) {
        cardRepository.save(card);
    }
}
