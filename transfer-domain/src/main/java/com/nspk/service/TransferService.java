package com.nspk.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class TransferService {
    private static final Logger logger = LoggerFactory.getLogger(String.class);
    public Mono<Map<String, String>> getInfoByPhoneAndOrganization(String url, Map<String, String> transfer) {
        return WebClient.create().post()
                .uri("http://" + url + ":8081/api/transfer/info")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(transfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {});
    }
}
