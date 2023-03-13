package com.example.main.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

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
    private Timestamp expDate;

    @Column(name = "money")
    private double money;

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
                ", money=" + money +
                ", firstName='" + firstName + '\'' +
                ", secondName='" + secondName + '\'' +
                ", userId=" + userId +
                ", lock=" + lock +
                ", typeId=" + typeId +
                '}';
    }
}
