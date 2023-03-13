package com.example.main.dao;

import com.example.main.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface CardDAO<T extends Card> extends JpaRepository<T, Long> {
    List<T> findByUserId(Long id);
    T findByCardNum(String cardNum);
}
