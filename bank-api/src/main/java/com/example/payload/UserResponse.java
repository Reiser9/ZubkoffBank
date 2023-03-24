package com.example.payload;

import com.example.model.Card;
import com.example.model.DataUser;
import com.example.model.Role;
import com.example.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class UserResponse {
    private long id;
    private String phoneNum;
    private String accountNum;
    private String verify;
    private List<Role> roles;
    private List<Card> cards;
    private DataUser dataUsers;

    public UserResponse(User user) {
        this.id = user.getId();
        this.phoneNum = user.getPhoneNum();
        this.accountNum = user.getAccountNum();
        this.verify = user.getVerify();
        this.roles = user.getRoles();
        this.cards = user.getCards();
        this.dataUsers = user.getDataUsers().get(user.getDataUsers().size()-1);
    }
}
