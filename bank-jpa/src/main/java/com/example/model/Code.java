package com.example.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "codes")
@Component
public class Code {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code")
    private int code;

    @Column(name = "type")
    private String type;

    @Column(name = "exp_date")
    private Timestamp expDate;

    @Column(name = "fk_id_user")
    private Long userId;
}