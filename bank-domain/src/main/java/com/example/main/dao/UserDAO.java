package com.example.main.dao;


import com.example.main.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserDAO<T extends User>  extends JpaRepository<T, Long>  {

	T findByPhoneNum(String phoneNum);

	T findByAccountNum(String accountNum);
	
}