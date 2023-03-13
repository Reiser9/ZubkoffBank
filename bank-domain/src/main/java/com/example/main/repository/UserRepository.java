package com.example.main.repository;

import com.example.main.dao.UserDAO;
import com.example.main.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends UserDAO<User> {
}
