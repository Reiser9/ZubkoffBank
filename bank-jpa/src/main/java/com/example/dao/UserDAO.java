package com.example.dao;


import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;


public interface UserDAO<T extends User>  extends JpaRepository<T, Long>  {
	T findByPhoneNum(String phoneNum);

	T findByAccountNum(String accountNum);
	@Modifying
	int deleteByPhoneNum(String password);
}