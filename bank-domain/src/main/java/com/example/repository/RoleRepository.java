package com.example.repository;

import com.example.dao.RoleDAO;
import com.example.model.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends RoleDAO<Role> {
}
