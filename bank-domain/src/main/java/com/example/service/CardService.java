package com.example.service;

import com.example.dto.CardData;
import com.example.model.Card;
import com.example.model.Type;
import com.example.repository.CardRepository;
import com.example.repository.TypeRepository;
import com.example.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Time;
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

    public Card createCard(CardData cardData, String bankId) {
        Card card = new Card();
        card.setCardNum(generateCardNum(bankId));
        card.setCvc(generateCvc());
        card.setExpDate(generateCardDateExpired());
        card.setBalance(0);

        card.setFirstName(cardData.getFirstName());
        card.setSecondName(cardData.getSecondName());
        card.setLock(false);
        Type type = typeRepository.findById(cardData.getTypeId()).get();
        card.setType(type);
        card.setRemainsLimit(type.getLimit());
        return card;
    }

    public Card reissueCard(Card card, String bankId) {
        card.setExpDate(generateCardDateExpired());
        card.setCardNum(generateCardNum(bankId));
        card.setCvc(generateCvc());
        card.setLock(false);
        return card;
    }

    public String generateCvc() {
        return String.valueOf((int)(100 + (Math.random() * (999 - 100))));
    }

    public String generateCardNum(String bankId) {
        String cardNum = "";
        do {
            cardNum = bankId
                    + String.valueOf((int) (1000 + (Math.random() * (9999 - 1000))))
                    + String.valueOf((int) (1000 + (Math.random() * (9999 - 1000))))
                    + String.valueOf((int) (1000 + (Math.random() * (9999 - 1000))));
        } while (findCardByCardNum(cardNum) != null);
        return cardNum;
    }

    public Timestamp generateCardDateExpired() {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
        cal.add(Calendar.YEAR, 4);
        return new Timestamp(cal.getTime().getTime());
    }

    public Card findCardByCardNum(String cardNum) {
        return cardRepository.findByCardNum(cardNum);
    }

    public void save(Card card) {
        cardRepository.save(card);
    }
}
