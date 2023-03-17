package com.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import com.example.model.RefreshToken;
import com.example.model.User;


public interface RefreshTokenDAO<T extends RefreshToken> extends JpaRepository<T, Long> {

	T findByRefreshToken(String token);

	@Modifying
	int deleteByUser(User user);

}
