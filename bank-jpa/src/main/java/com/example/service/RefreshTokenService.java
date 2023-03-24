package com.example.service;

import java.time.Instant;
import java.util.UUID;
import javax.transaction.Transactional;

import com.example.repository.RefreshTokenRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.model.RefreshToken;

@Service
public class RefreshTokenService {

	@Value("${jwt.refreshExp}")
	private Long refreshTokenDurationMs;
	@Autowired
	private RefreshTokenRepository refreshTokenRepository;
	@Autowired
	private UserRepository userRepository;

	public RefreshTokenService(UserRepository userDAO) {
		this.userRepository = userDAO;
	}

	public RefreshToken findByRefreshToken(String token) {
		return refreshTokenRepository.findByRefreshToken(token);
	}

	public Long findUserByRefreshToken(String token) {
		return refreshTokenRepository.findByRefreshToken(token).getUser().getId();
	}

	public RefreshToken createRefreshToken(Long userId) {
		RefreshToken refreshToken = new RefreshToken();

		refreshToken.setUser(userRepository.findById(userId).get());
		refreshToken.setExpDate(Instant.now().plusMillis(refreshTokenDurationMs));
		refreshToken.setRefreshToken(UUID.randomUUID().toString());
		refreshToken = refreshTokenRepository.save(refreshToken);

		return refreshToken;
	}

	public RefreshToken verifyExpiration(RefreshToken token) {
		if (token.getExpDate().compareTo(Instant.now()) < 0) {
			refreshTokenRepository.delete(token);
			return null;
		}

		return token;
	}

	@Transactional
	public int deleteByUserId(Long userId) {
		return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
	}

	@Transactional
	public int deleteByRefreshToken(String token) {
		return refreshTokenRepository.deleteByRefreshToken(token);
	}
	
}
