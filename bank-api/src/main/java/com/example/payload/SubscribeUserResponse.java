package com.example.payload;


import com.example.model.UserSubscribe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Setter
@Getter
@AllArgsConstructor
public class SubscribeUserResponse {
    private SubscribeResponse subscribe;
    private Timestamp datePayment;
    private boolean status;

    public SubscribeUserResponse(UserSubscribe userSubscribe, String link) {
        this.subscribe = new SubscribeResponse(userSubscribe.getSubscribe(), link);
        this.datePayment = userSubscribe.getDatePayment();
        this.status = userSubscribe.isStatus();
    }
}
