package com.example.model.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CreateRoleRequest {
    private Integer id;
    private String role;
}
