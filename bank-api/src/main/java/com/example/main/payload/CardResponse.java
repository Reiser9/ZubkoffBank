package com.example.main.payload;

import com.example.main.model.Card;
import com.example.main.model.Type;
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
    private double money;
    private String firstName;
    private String secondName;
    private int type;
    private boolean isLock;

    public CardResponse(Card card) {
        this.id = card.getId();
        this.cardNum = card.getCardNum();
        this.cvc = card.getCvc();
        this.expDate = card.getExpDate();
        this.money = card.getMoney();
        this.firstName = card.getFirstName();
        this.secondName = card.getSecondName();
        this.type = card.getTypeId();
        this.isLock = card.isLock();
    }
}
