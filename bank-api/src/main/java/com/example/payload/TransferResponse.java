package com.example.payload;

import com.example.model.Transfer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Setter
@Getter
@AllArgsConstructor
public class TransferResponse {
    private Timestamp date;
    private double balance;
    private double money;
    private String organization;
    private String status;
    private String type;

    public TransferResponse(Transfer transfer) {
        this.date = transfer.getDate();
        this.balance = transfer.getBalance();
        this.money = transfer.getMoney();
        this.organization = transfer.getOrganization();
        this.status = transfer.getStatus();
        this.type = transfer.getType();
    }
}
