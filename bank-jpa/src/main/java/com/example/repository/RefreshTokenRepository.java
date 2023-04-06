package com.example.repository;

import com.example.dao.RefreshTokenDAO;
import com.example.model.RefreshToken;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends RefreshTokenDAO<RefreshToken> {
}
