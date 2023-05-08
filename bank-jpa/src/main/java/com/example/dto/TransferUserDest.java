package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferUserDest {
    private Double money;
    private String phoneNum;
    private String organization;

    public TransferUserDest(TransferData dataTransfer) {
        this.money = dataTransfer.getMoney();
        this.phoneNum = dataTransfer.getDestPhoneNum();
        this.organization = dataTransfer.getOrganization();
    }
}
