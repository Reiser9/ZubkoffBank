package com.example.main.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class FullInfoUserResponse {
    private Long userid;
    private String phoneNum;
    private String verified;
    private List<String> roles;
    private String firstName;
    private String secondName;
    private String middleName;
    private String passportNum;
    private String passportSer;
    private String address;
    private Date birthdate;
    private Boolean sex;
}