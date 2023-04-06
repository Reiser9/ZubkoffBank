package com.nspk.service;

import com.nspk.model.User;
import com.nspk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        userRepository.save(user);
        return user;
    }

    public User findUserByPhoneNum(String phoneNum) {
        return userRepository.findByPhoneNum(phoneNum);
    }
}

