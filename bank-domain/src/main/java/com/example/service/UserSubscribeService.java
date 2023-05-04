package com.example.service;

import com.example.model.Subscribe;
import com.example.model.User;
import com.example.model.UserSubscribe;
import com.example.repository.UserRepository;
import com.example.repository.UserSubscribeRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
@AllArgsConstructor
public class UserSubscribeService {
    @Autowired
    private UserSubscribeRepository userSubscribeRepository;

    public UserSubscribe findUserSubscribeById(int id) {
        return userSubscribeRepository.findById(id).get();
    }

    public List<UserSubscribe> findUserSubscribeByUser(User user) {
        return userSubscribeRepository.findByUser(user);
    }

    public UserSubscribe findUserSubscribeByUserAndSubscribe(User user, Subscribe subscribe) {
        return userSubscribeRepository.findByUserAndSubscribe(user,subscribe);
    }

    public UserSubscribe save(UserSubscribe userSubscribe) {
        return userSubscribe = userSubscribeRepository.save(userSubscribe);
    }
}
