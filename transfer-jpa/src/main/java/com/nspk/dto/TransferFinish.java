package com.nspk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferFinish {
    private long transferId;
    private String cardNum;
    private Double money;

    public TransferFinish(TransferData dataTransfer) {
        this.transferId = dataTransfer.getTransferId();
        this.cardNum = dataTransfer.getCardNum();
        this.money = dataTransfer.getMoney();
    }
}
