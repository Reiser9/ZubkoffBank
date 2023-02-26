package com.example.model.request;

import com.example.domain.Role;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CreateUserRequest {
    private Integer id;
    private String phone_num;
//    private Integer fk_card;
    private String password;
    private Role fk_role;
    private String account_number;
//    private Integer fk_data;
}
