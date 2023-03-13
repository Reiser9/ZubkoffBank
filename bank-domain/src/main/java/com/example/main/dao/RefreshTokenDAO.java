package com.example.main.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import com.example.main.model.RefreshToken;
import com.example.main.model.User;
import org.springframework.stereotype.Repository;


public interface RefreshTokenDAO<T extends RefreshToken> extends JpaRepository<T, Long> {

	T findByRefreshToken(String token);

	@Modifying
	int deleteByUser(User user);

}
