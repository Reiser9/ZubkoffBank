package com.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.Role;


public interface RoleDAO<T extends Role> extends JpaRepository<T, Long> {
	Role findById(Integer roleId);
	Role findByRole(String role);

}
