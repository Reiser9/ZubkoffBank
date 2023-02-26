package com.example.model.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CreateUserRequest {
    private Integer id;
    private String phone_num;
    private String password;
    private String account_number;
}
