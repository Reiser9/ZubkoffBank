package com.nspk.dto;

import com.nspk.model.Bank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankInfo {
    private String organization;
    private int code;

    public BankInfo(Bank bank) {
        this.organization = bank.getOrganization();
        this.code = bank.getCode();
    }
}
