package com.example.main.payload;

import com.example.main.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String phoneNum;
    private String verified;
    private List<String> roles;
    private String firstName;
}
