package com.nspk.dto;

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
    private String organization;
    private String codeConfirm;
    private long transferId;

}
