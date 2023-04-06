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
@Table(name = "transfers")
@Component
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Timestamp date;

    @Column(name = "balance")
    private double balance;

    @Column(name = "money")
    private double money;

    @Column(name = "organization")
    private String organization;

    @Column(name = "fk_id_card")
    private int cardId;
}
