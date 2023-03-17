package com.example.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class FullInfoUserResponse {
    private Long id;
    private String phoneNum;
    private String verified;
    private List<String> roles;
    private String firstName;
    private String secondName;
    private String middleName;
    private String passportNum;
    private String passportSer;
    private String address;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date issue;
    private Boolean sex;
}