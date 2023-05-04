package com.example.payload;


import com.example.model.Subscribe;
import com.example.model.User;
import com.example.model.UserSubscribe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class SubscribeResponse {
    private int id;
    private String name;
    private double money;
    private int period;
    private String description;

    public SubscribeResponse(UserSubscribe subscribe) {
        this.id = subscribe.getSubscribe().getId();
        this.name = subscribe.getSubscribe().getName();
        this.money = subscribe.getSubscribe().getMoney();
        this.period = subscribe.getSubscribe().getPeriod();
        this.description = subscribe.getSubscribe().getDescription();
    }
}
