package com.example.dao;

import com.example.model.Type;
import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface TypeDAO<T extends Type> extends JpaRepository<T, Integer> {
//    @Modifying
//    void deleteById(int id);
}
