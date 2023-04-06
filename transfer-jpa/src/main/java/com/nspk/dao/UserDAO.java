package com.nspk.dao;


import com.nspk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO<T extends User> extends JpaRepository<T, Long> {
    T findByPhoneNum(String phoneNum);
}
