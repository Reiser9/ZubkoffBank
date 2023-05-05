package com.example.payload;



import com.example.model.Subscribe;
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

    public SubscribeResponse(Subscribe subscribe) {
        this.id = subscribe.getId();
        this.name = subscribe.getName();
        this.money = subscribe.getMoney();
        this.period = subscribe.getPeriod();
        this.description = subscribe.getDescription();
    }
}
