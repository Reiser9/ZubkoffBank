package com.example.repository;

import com.example.dao.UserSubscribeDAO;
import com.example.model.UserSubscribe;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSubscribeRepository extends UserSubscribeDAO<UserSubscribe> {
}
