package com.example.payload;

import com.example.model.Card;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
public class CardResponse {
    private long id;
    private String cardNum;
    private String cvc;
    private Date expDate;
    private double balance;
    private String firstName;
    private String secondName;
    private int type;
    private boolean isLock;

    public CardResponse(Card card) {
        this.id = card.getId();
        this.cardNum = card.getCardNum();
        this.cvc = card.getCvc();
        this.expDate = card.getExpDate();
        this.balance = card.getMoney();
        this.firstName = card.getFirstName();
        this.secondName = card.getSecondName();
        this.type = card.getTypeId();
        this.isLock = card.isLock();
    }
}
