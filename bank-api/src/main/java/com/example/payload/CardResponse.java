package com.example.payload;

import com.example.model.Card;
import com.example.model.Transfer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private int typeId;
    private boolean isLock;
    private List<Transfer> transfers;

    public CardResponse(Card card) {
        this.id = card.getId();
        this.cardNum = card.getCardNum();
        this.cvc = card.getCvc();
        this.expDate = card.getExpDate();
        this.balance = card.getBalance();
        this.firstName = card.getFirstName();
        this.secondName = card.getSecondName();
        this.typeId = card.getTypeId();
        this.isLock = card.isLock();
        this.transfers = card.getTransfers() == null ? new ArrayList<>() : card.getTransfers();
    }
}
