package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserBalance {
    private long id;
    private double balance;

    public UserBalance(String id, String balance) {
        this.id = Long.parseLong(id);
        this.balance = Double.parseDouble(balance);
    }

    public UserBalance(int id, double balance) {
        this.id = id;
        this.balance = balance;
    }
}
