package com.example.service;

import com.example.dto.SubscribeInfo;
import com.example.model.Subscribe;
import com.example.model.Transfer;
import com.example.model.User;
import com.example.model.UserSubscribe;
import com.example.repository.SubscribeRepository;
import com.example.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubscribeService {
    @Value("${nspk.url}")
    private String url;
    @Value("${nspk.port}")
    private String port;
    @Value("${bank.id}")
    private String code;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SubscribeRepository subscribeRepository;

    public int getLength() {
        return subscribeRepository.findAll().size();
    }
    private static final Logger logger = LoggerFactory.getLogger(SubscribeService.class);

    public Subscribe findSubscribeById(int id) {
        return subscribeRepository.findById(id);
    }

    public List<Subscribe> findSubscribes() {
        return subscribeRepository.findAll();
    }

    public Mono<Integer> subscribe(User user) {
        return WebClient.create().post()
                .uri("http://" + url + ":" + port + "/subscribe")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new SubscribeInfo(user.getPhoneNum(), Integer.parseInt(code)))
                .exchangeToMono(response -> response.toEntity(String.class))
                .flatMap(entityResponse -> {
                    int statusCode = entityResponse.getStatusCode().value();
                    return Mono.just(statusCode);
                });
    }
}
