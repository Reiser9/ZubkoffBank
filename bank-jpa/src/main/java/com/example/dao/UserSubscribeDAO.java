package com.example.dao;

import com.example.model.Subscribe;
import com.example.model.User;
import com.example.model.UserSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface UserSubscribeDAO<T extends UserSubscribe>  extends JpaRepository<T, Integer> {
    List<T> findByUser(User user);
    T findByUserAndSubscribe(User user, Subscribe subscribe);
    List<T> findByStatusAndDatePaymentBefore(boolean status, Timestamp date);
}
