package com.example.service;

import com.example.model.Card;
import com.example.repository.CardRepository;
import com.example.repository.TypeRepository;
import com.example.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service
@Getter
@Setter
@AllArgsConstructor
public class CardService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private TypeRepository typeRepository;

    public Card findCardById(Long id) { return cardRepository.findById(id).get();}

    public List<Card> findCardByUserId(Long id) {
        return cardRepository.findByUserIdOrderById(id);
    }

    public List<Card> findAllByRemainsLimitNotEqualsTypeLimit() { return cardRepository.findAllByRemainsLimitNotEqualsTypeLimit(); }

    public Card createCard(Map<String, String> data_card, String bankId) {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
        cal.add(Calendar.YEAR, 4);
        Timestamp date = new Timestamp(cal.getTime().getTime());
        String cardNum = "";
        while(true) {
            cardNum = bankId
                    + String.valueOf((int)(1000 + (Math.random() * (9999 - 1000))))
                    + String.valueOf((int)(1000 + (Math.random() * (9999 - 1000))))
                    + String.valueOf((int)(1000 + (Math.random() * (9999 - 1000))));
            if (findCardByCardNum(cardNum) == null)
                break;
        }
        Card card = new Card();
        card.setCardNum(cardNum);
        card.setCvc(String.valueOf((int)(100 + (Math.random() * (999 - 100)))));
        card.setExpDate(date);
        card.setBalance(0);
        card.setFirstName(data_card.get("firstName"));
        card.setSecondName(data_card.get("secondName"));
        card.setLock(false);
        card.setType(typeRepository.findById(Integer.valueOf(data_card.get("typeId"))).get());
        return card;
    }

    public Card findCardByCardNum(String cardNum) {
        return cardRepository.findByCardNum(cardNum);
    }

    public void save(Card card) {
        cardRepository.save(card);
    }
}
