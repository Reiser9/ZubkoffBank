package com.example.service;

import com.example.dto.BankInfo;
import com.example.model.Transfer;
import com.example.dto.TransferInfo;
import com.example.repository.CardRepository;
import com.example.repository.TransferRepository;
import com.example.repository.UserRepository;
import com.example.producer.TransferProducer;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
@Getter
@Setter
public class TransferService {
    private static final Logger logger = LoggerFactory.getLogger(String.class);
    @Value("${nspk.url}")
    @Autowired
    private String url;
    @Value("${bank.id}")
    @Autowired
    private String code;
    @Autowired
    private TransferProducer transferProducer;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransferRepository transferRepository;
    @Autowired
    private CardRepository cardRepository;

    public Transfer findTransferById(long id) {
        return transferRepository.findById(id).get();
    }

    public Mono<ResponseEntity<TransferInfo>> getInfoByPhone(Map<String, String> transfer) {
        transfer.put("code", code);
        return WebClient.create().post()
                .uri(url + "/transfer/info")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(transfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {})
                .flatMap(data -> {
                    TransferInfo transferInfo = new TransferInfo(
                            data.get("fullName"),
                            data.get("phoneNum"),
                            data.get("cardNum"),
                            data.get("organization"));
                    return Mono.just(transferInfo);
                })
                .map(ResponseEntity::ok);
    }

    public Mono<ResponseEntity<List<BankInfo>>> getBanksInfoByPhone(Map<String, String> transfer) {
        return WebClient.create().post()
                .uri(url + "/transfer/bank_info")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(transfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<BankInfo>>() {})
                .flatMap(data -> {
                    List<BankInfo> bankInfo = data;
                    return Mono.just(bankInfo);
                })
                .map(ResponseEntity::ok);
    }

    public Mono<ResponseEntity<?>> sbpRegister(Map<String, String> transfer) {
        return WebClient.create().post()
                .uri(url + "/transfer/sbp_register")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(transfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String,String>>() {})
                .map(ResponseEntity::ok);
    }

    public void sendMoney(Map<String, String> message) throws JsonProcessingException {
        message.put("sourceCode", code);
        transferProducer.sendMessage(message);
    }

}
