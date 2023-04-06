package com.example.repository;

import com.example.dao.UserDAO;
import com.example.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends UserDAO<User> {
}
