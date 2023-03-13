package com.example.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import com.example.main.model.RefreshToken;
import com.example.main.model.User;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	RefreshToken findByRefreshToken(String token);

	@Modifying
	int deleteByUser(User user);

}
