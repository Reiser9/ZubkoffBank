package com.nspk.service;

import com.nspk.dto.SubscribeInfo;
import com.nspk.dto.TransferData;
import com.nspk.dto.TransferResult;
import com.nspk.dto.TransferUserDest;
import com.nspk.model.Transfer;
import com.nspk.model.User;
import com.nspk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Map;

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


    public Mono<Map<String, String>> isSubscribed(String destUrl, SubscribeInfo subscribeInfo) {
        return WebClient.create().post()
                .uri("http://" + destUrl + ":8081/api/subscribe_check_user/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(subscribeInfo)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {
                });
    }
}

