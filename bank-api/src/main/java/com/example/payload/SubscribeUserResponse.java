package com.example.payload;

import com.example.model.Subscribe;
import com.example.model.User;
import com.example.model.UserSubscribe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Setter
@Getter
@AllArgsConstructor
public class SubscribeUserResponse {
    private Subscribe subscribe;
    private Timestamp datePayment;
    private boolean status;

    public SubscribeUserResponse(UserSubscribe userSubscribe) {
        this.subscribe = userSubscribe.getSubscribe();
        this.datePayment = userSubscribe.getDatePayment();
        this.status = userSubscribe.isStatus();
    }
}
