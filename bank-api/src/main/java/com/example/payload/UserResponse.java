package com.example.payload;

import com.example.model.Card;
import com.example.model.DataUser;
import com.example.model.Role;
import com.example.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
public class UserResponse {
    private long id;
    private String phoneNum;
    private String accountNum;
    private String verify;
    private List<String> roles;
    private List<CardResponse> cards;
    private DataUserResponse dataUsers;

    public UserResponse(User user) {
        this.id = user.getId();
        this.phoneNum = user.getPhoneNum();
        this.accountNum = user.getAccountNum();
        this.verify = user.getVerify();
        this.roles = user.getRoles().stream().map(Role::getRole).collect(Collectors.toList());
        this.cards =  user.getCards().stream().map(CardResponse::new).collect(Collectors.toList());
        this.dataUsers = new DataUserResponse(user.getDataUsers().get(user.getDataUsers().size()-1));
    }
}
