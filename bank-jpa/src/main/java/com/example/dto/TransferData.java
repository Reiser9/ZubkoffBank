package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferData {
    private Double money;
    private String cardNum;
    private String destOrganization;
    private String destCode;
    private String code;
    private String destPhoneNum;
    private String destCardNum;
    private String organization;
    private int codeConfirm;
    private long transferId;
    private String message;
}
