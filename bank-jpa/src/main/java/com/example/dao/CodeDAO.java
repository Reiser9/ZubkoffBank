package com.example.dao;

import com.example.model.Code;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodeDAO<T extends Code> extends JpaRepository<T, Long> {
    T findByType(String type);
    List<T> findByUserId(Long id);
}
