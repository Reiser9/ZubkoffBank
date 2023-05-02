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
public class TransferInfoClient {
    private String money;
    private String phoneNum;
    private String organization;

    public TransferInfoClient(Map<String, String> dataTransfer) {
        this.money = dataTransfer.get("money");
        this.phoneNum = dataTransfer.get("destPhoneNum");
        this.organization = dataTransfer.get("organization");
    }
}
