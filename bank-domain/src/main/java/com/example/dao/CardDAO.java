package com.example.dao;

import com.example.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CardDAO<T extends Card> extends JpaRepository<T, Long> {
    List<T> findByUserId(Long id);
    T findByCardNum(String cardNum);
}
