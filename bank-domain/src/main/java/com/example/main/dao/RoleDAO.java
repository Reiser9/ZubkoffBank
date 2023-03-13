package com.example.main.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.main.model.Role;
import org.springframework.stereotype.Repository;


public interface RoleDAO<T extends Role> extends JpaRepository<T, Long> {

	Role findByRole(String role);

}
