package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAuth {
    private String phoneNum;
    private String password;
    private String fullName;
    private int code;

    public UserAuth(String phoneNum, String password, String fullName, String code) {
        this.phoneNum = phoneNum;
        this.password = password;
        this.fullName = fullName;
        this.code = Integer.parseInt(code);
    }
}
