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
public class TransferResult {
    private int status;
    private int transferId;

    @Override
    public String toString() {
        return "TransferResult{" +
                "status=" + status +
                ", transferId=" + transferId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TransferResult that = (TransferResult) o;
        return status == that.status && transferId == that.transferId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, transferId);
    }
}
