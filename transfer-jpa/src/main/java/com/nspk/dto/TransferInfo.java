package com.nspk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferInfo {
    private String fullName;
    private String phoneNum;
    private String cardNum;
    private String organization;

    @Override
    public String toString() {
        return "TransferInfo{" +
                "fullName='" + fullName + '\'' +
                ", phoneNum='" + phoneNum + '\'' +
                ", cardNum='" + cardNum + '\'' +
                ", organization='" + organization + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TransferInfo that = (TransferInfo) o;
        return fullName.equals(that.fullName) && phoneNum.equals(that.phoneNum) && cardNum.equals(that.cardNum) && organization.equals(that.organization);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fullName, phoneNum, cardNum, organization);
    }
}