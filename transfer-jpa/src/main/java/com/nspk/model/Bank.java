package com.nspk.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "banks")
@Component
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name="code_bank", unique = true)
    private int code;

    @Column(name="ip")
    private String ip;

    @Column(name="organization")
    private String organization;

}
