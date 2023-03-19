package com.example.dao;

import com.example.model.Code;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeDAO<T extends Code> extends JpaRepository<T, Long> {
    T findByType(String type);
    T findByUserId(Long id);
}
