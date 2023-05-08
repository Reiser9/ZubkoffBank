package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Column(name = "balance")
    private double balance;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "fk_id_user")
    private Long userId;

    @Column(name = "lock")
    private boolean lock;

    @Column(name = "remains_limit")
    private double remainsLimit;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_id_card", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Transfer> transfers;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "fk_id_type", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Type type;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Card card = (Card) o;
        return id == card.id && Double.compare(card.balance, balance) == 0 && lock == card.lock &&  cardNum.equals(card.cardNum) && cvc.equals(card.cvc) && expDate.equals(card.expDate) && firstName.equals(card.firstName) && secondName.equals(card.secondName) && userId.equals(card.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cardNum, cvc, expDate, balance, firstName, secondName, userId, lock);
    }
    @Transactional
    public void setBalance(double balance) {
        this.balance = balance;
    }
}
