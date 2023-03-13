package com.example.main.repository;

import com.example.main.dao.CardDAO;
import com.example.main.model.Card;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends CardDAO<Card> {
}
