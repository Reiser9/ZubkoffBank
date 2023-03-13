package com.example.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.main.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
	
	Role findByRole(String role);

}
