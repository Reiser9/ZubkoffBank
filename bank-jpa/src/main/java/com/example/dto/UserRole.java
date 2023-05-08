package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRole {
    private long id;
    private int roleId;

    public UserRole(long id, String roleId) {
        this.id = id;
        this.roleId = Integer.parseInt(roleId);
    }
}
