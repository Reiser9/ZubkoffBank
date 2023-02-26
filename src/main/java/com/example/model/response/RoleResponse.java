package com.example.model.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class RoleResponse {
    private Integer id;
    private String role;
}