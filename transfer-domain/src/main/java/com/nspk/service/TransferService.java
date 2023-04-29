package com.nspk.service;

import com.nspk.dto.TransferInfo;
import com.nspk.model.Transfer;
import com.nspk.repository.TransferRepository;
import com.nspk.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.util.Map;

@Service
public class TransferService {
    @Autowired
    private TransferRepository transferRepository;
    private static final Logger logger = LoggerFactory.getLogger(String.class);
    public Mono<Map<String, String>> getInfoByPhoneAndOrganization(String url, Map<String, String> transfer) {
        return WebClient.create().post()
                .uri("http://" + url + ":8081/api/transfer/info")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(transfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {});
    }

    public void sendMoneyToUserByPhoneAndOrganization(String url, Map<String, String> dataTransfer) {
        TransferInfo sourceResult = new TransferInfo();
        WebClient.create().post()
                .uri("http://" + url + ":8081/api/transfer/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(dataTransfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {})
                .flatMap(data -> {

                    TransferInfo destResult = new TransferInfo(
                            data.get("fullName"),
                            data.get("phoneNum"),
                            data.get("cardNum"),
                            data.get("organization"));
                    logger.error(destResult.getOrganization());
                    return Mono.just(destResult);
                })
                .doOnNext(destResult -> {
                    logger.error(destResult.toString());
                    if (destResult.equals(new TransferInfo())) {
//            Transfer transfer = new Transfer();
//            transfer.setDate(new Timestamp());
//            transfer.setMoney(data.get("money"));
//            transfer.set
                        WebClient.create().post()
                                .uri("http://" + dataTransfer.get("sourceUrl") + ":8081/api/rollback_transfer/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .bodyValue(dataTransfer)
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<TransferInfo>() {}).flatMap(data -> {
                                    sourceResult.setOrganization(data.getOrganization());
                                    return null;
                                });
                    }
                    else {
                        WebClient.create().post()
                                .uri("http://" + dataTransfer.get("sourceUrl") + ":8081/api/commit_transfer/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .bodyValue(dataTransfer)
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {});
                    }
                })
                .subscribe();




        // Добавить Transfer = new Transfer();
//        WebClient.create().post()
//                .uri("http://" + url + ":8081/api/transfer/")
//                .contentType(MediaType.APPLICATION_JSON)
//                .bodyValue(dataTransfer)
//                .retrieve()
//                .bodyToMono(new ParameterizedTypeReference<TransferInfo>() {}).flatMap(data -> {
//                    destResult.setFullName(data.getFullName());
//                    destResult.setPhoneNum(data.getPhoneNum());
//                    destResult.setCardNum(data.getCardNum());
//                    destResult.setOrganization(data.getOrganization());
//                    logger.error(destResult.toString());
//                    return null;
//
//                });

//        if (destResult.equals(new TransferInfo())) {
////            Transfer transfer = new Transfer();
////            transfer.setDate(new Timestamp());
////            transfer.setMoney(data.get("money"));
////            transfer.set
//            WebClient.create().post()
//                    .uri("http://" + dataTransfer.get("sourceUrl") + ":8081/api/rollback_transfer/")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .bodyValue(dataTransfer)
//                    .retrieve()
//                    .bodyToMono(new ParameterizedTypeReference<TransferInfo>() {}).flatMap(data -> {
//                        sourceResult.setOrganization(data.getOrganization());
//                        return null;
//                    });
//        }
//        else {
//            WebClient.create().post()
//                    .uri("http://" + dataTransfer.get("sourceUrl") + ":8081/api/commit_transfer/")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .bodyValue(dataTransfer)
//                    .retrieve()
//                    .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {});
//        }
    }
}
