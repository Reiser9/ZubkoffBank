package com.example.main.dao;

import com.example.main.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface TypeDAO<T extends Type> extends JpaRepository<T, Integer> {
}
