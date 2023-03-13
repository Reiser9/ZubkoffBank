package com.example.main.repository;

import com.example.main.dao.RoleDAO;
import com.example.main.model.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends RoleDAO<Role> {
}
