package com.example.main.dao;

import com.example.main.model.Code;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeDAO<T extends Code> extends JpaRepository<T, Long> {
    T findByType(String type);
}
