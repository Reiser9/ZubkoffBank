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
public class ShortInfoUserResponse {
    private Long id;
    private String phoneNum;
    private String verified;
    private List<String> roles;
    private String firstName;
}
