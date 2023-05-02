package com.example.dao;

import com.example.model.Card;
import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;


public interface CardDAO<T extends Card> extends JpaRepository<T, Long> {
    List<T> findByUserIdOrderById(Long id);
    T findByCardNum(String cardNum);
}
