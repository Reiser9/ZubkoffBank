package com.example.dao;

import com.example.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeDAO<T extends Type> extends JpaRepository<T, Integer> {
//    @Modifying
//    void deleteById(int id);
}
