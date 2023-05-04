package com.example.dao;

import com.example.model.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribeDAO<T extends Subscribe> extends JpaRepository<T, Integer> {
}
