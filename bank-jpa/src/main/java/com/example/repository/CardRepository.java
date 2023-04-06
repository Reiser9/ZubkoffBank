package com.example.repository;

import com.example.dao.CardDAO;
import com.example.model.Card;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends CardDAO<Card> {
}
