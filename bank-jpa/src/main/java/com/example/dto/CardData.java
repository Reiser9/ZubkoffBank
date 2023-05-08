package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardData {
    private String firstName;
    private String secondName;
    private int typeId;

    public CardData(String firstName, String secondName, String typeId) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.typeId = Integer.parseInt(typeId);
    }
}
