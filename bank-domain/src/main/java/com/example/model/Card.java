package com.example.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;
import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "cards")
@Component
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "card_number", unique = true)
    private String cardNum;

    @Column(name = "cvc")
    private String cvc;

    @Column(name = "exp_date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Timestamp expDate;

    @Column(name = "money")
    private double balance;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "fk_id_user")
    private Long userId;

    @Column(name = "lock")
    private boolean lock;

    @Column(name = "fk_id_type")
    private int typeId;

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", cardNum='" + cardNum + '\'' +
                ", cvc='" + cvc + '\'' +
                ", expDate=" + expDate +
                ", money=" + balance +
                ", firstName='" + firstName + '\'' +
                ", secondName='" + secondName + '\'' +
                ", userId=" + userId +
                ", lock=" + lock +
                ", typeId=" + typeId +
                '}';
    }
}
