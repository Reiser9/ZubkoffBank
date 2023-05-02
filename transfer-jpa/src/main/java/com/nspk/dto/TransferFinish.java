package com.nspk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferFinish {
    private long transferId;
    private String cardNum;
    private String money;

    public TransferFinish(Map<String, String> dataTransfer) {
        this.transferId = Long.parseLong(dataTransfer.get("transferId"));
        this.cardNum = dataTransfer.get("cardNum");
        this.money = dataTransfer.get("money");
    }
}
