package com.example.main.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class UserResponse {
    private Long userid;
    private String accountNum;
    private String phoneNum;
    private List<String> roles;
}
