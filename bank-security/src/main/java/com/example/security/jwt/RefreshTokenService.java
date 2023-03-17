package com.example.security.jwt;

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
	private RefreshTokenRepository refreshTokenDAO;
	@Autowired
	private UserRepository userRepository;

	public RefreshTokenService(UserRepository userDAO) {
		this.userRepository = userDAO;
	}

	public RefreshToken findByRefreshToken(String token) {
		return refreshTokenDAO.findByRefreshToken(token);
	}

	public RefreshToken createRefreshToken(Long userId) {
		RefreshToken refreshToken = new RefreshToken();

		refreshToken.setUser(userRepository.findById(userId).get());
		refreshToken.setExpDate(Instant.now().plusMillis(refreshTokenDurationMs));
		refreshToken.setRefreshToken(UUID.randomUUID().toString());
		refreshToken = refreshTokenDAO.save(refreshToken);

		return refreshToken;
	}

	public RefreshToken verifyExpiration(RefreshToken token) {
		if (token.getExpDate().compareTo(Instant.now()) < 0) {
			refreshTokenDAO.delete(token);
			return null;
		}

		return token;
	}

	@Transactional
	public int deleteByUserId(Long userId) {
		return refreshTokenDAO.deleteByUser(userRepository.findById(userId).get());
	}
	
}
