package com.example.repository;

import com.example.dao.SubscribeDAO;
import com.example.model.Subscribe;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscribeRepository extends SubscribeDAO<Subscribe> {
}
