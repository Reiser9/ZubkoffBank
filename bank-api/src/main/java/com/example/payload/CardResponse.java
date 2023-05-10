package com.example.payload;

import com.example.model.Card;
import com.example.model.Transfer;
import com.example.model.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
public class CardResponse {
    private long id;
    private String cardNum;
    private String cvc;
    private Date expDate;
    private double balance;
    private double remainsLimit;
    private String firstName;
    private String secondName;
    private TypeResponse type;
    private boolean isLock;

    public CardResponse(Card card, String url) {
        this.id = card.getId();
        this.cardNum = card.getCardNum();
        this.cvc = card.getCvc();
        this.expDate = card.getExpDate();
        this.balance = card.getBalance();
        this.remainsLimit = card.getRemainsLimit();
        this.firstName = card.getFirstName();
        this.secondName = card.getSecondName();
        this.type = new TypeResponse(card.getType(), url);
        this.isLock = card.isLock();
    }
}
