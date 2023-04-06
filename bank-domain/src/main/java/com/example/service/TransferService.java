package com.example.service;

import com.example.model.TransferInfo;
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
//    @Autowired
//    private TransferProducer transferProducer;
//    public void sendByPhone(Map<String, String> transfer) {
//        transferProducer.sendMessage(transfer);
//    }

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

//    public Mono<TransferInfo> getInfoByPhone(Map<String, String> transfer) {
//        transfer.put("code", code);
//        logger.error(transfer.toString());
//
//        Mono<User> userMono = WebClient.create()
//                .post()
//                .uri("http://localhost:8081/transfer/info")
//                .contentType(MediaType.APPLICATION_JSON)
//                .bodyValue(transfer)
//                .retrieve()
//                .bodyToMono(User.class);
//
//        Mono<Bank> bankMono = bankService.findBankByCode(Integer.parseInt(transfer.get("code")))
//                .map(bank -> WebClient.create()
//                        .post()
//                        .uri("http://" + bank.getIp() + ":8082/info")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .bodyValue(transfer)
//                        .retrieve()
//                        .bodyToMono(Map.class));
//
//        return Mono.zip(userMono, bankMono)
//                .flatMap(tuple -> {
//                    User user = tuple.getT1();
//                    Map<String, String> data = tuple.getT2();
//
//                    DataUser dataUser = user.getDataUsers().get(user.getDataUsers().size()-1);
//                    String fullName = dataUser.getSecondName() + " " + dataUser.getFirstName();
//                    String cardNum = user.getCards().get(0).getCardNum();
//                    String organization = data.get("organization");
//
//                    TransferInfo transferInfo = new TransferInfo(fullName, user.getPhoneNum(), cardNum, organization);
//                    return Mono.just(transferInfo);
//                });
//    }

}
