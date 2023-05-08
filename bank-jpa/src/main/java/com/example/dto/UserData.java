package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserData {
    private String granted;
    private String passportSer;
    private String passportNum;
    private String birthdate;
    private String grantedDate;
    private boolean sex;
}
