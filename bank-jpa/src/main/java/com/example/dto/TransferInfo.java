package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferInfo {
    private String fullName;
    private String phoneNum;
    private String organization;

    @Override
    public String toString() {
        return "TransferInfo{" +
                "fullName='" + fullName + '\'' +
                ", phoneNum='" + phoneNum + '\'' +
                ", cardNum='" + '\'' +
                ", organization='" + organization + '\'' +
                '}';
    }
}
