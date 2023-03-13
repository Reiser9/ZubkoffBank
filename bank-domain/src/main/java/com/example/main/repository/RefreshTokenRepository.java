package com.example.main.repository;

import com.example.main.dao.RefreshTokenDAO;
import com.example.main.model.RefreshToken;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends RefreshTokenDAO<RefreshToken> {
}
