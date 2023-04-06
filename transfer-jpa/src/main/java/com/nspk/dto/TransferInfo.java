package com.nspk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TransferInfo {
    private String fullName;
    private String phoneNum;
    private String cardNum;
    private String organization;
}