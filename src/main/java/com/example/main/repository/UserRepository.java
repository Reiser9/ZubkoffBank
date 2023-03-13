package com.example.main.repository;

import com.example.main.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import com.example.main.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByPhoneNum(String phoneNum);

	User findByAccountNum(String accountNum);
	
}