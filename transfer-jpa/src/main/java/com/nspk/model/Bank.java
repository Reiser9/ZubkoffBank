package com.nspk.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bank bank = (Bank) o;
        return id == bank.id && code == bank.code && Objects.equals(ip, bank.ip) && Objects.equals(organization, bank.organization);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, ip, organization);
    }
}
