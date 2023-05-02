package com.nspk.service;

import com.nspk.dto.TransferInfoClient;
import com.nspk.dto.TransferResult;
import com.nspk.dto.TransferFinish;
import com.nspk.repository.BankRepository;
import com.nspk.repository.TransferRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class TransferService {
    @Autowired
    private TransferRepository transferRepository;
    @Autowired
    private BankRepository bankRepository;
    private static final Logger logger = LoggerFactory.getLogger(String.class);
    public Mono<Map<String, String>> getInfoByPhoneAndOrganization(String url, Map<String, String> transfer) {
        return WebClient.create().post()
                .uri("http://" + url + ":8081/api/transfer/info")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(transfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {});
    }

    public void sendMoneyToUserByPhoneAndOrganization(String sourceUrl, String destUrl, Map<String, String> dataTransfer) {
        logger.error(dataTransfer.toString());
        WebClient.create().post()
                .uri("http://" + destUrl + ":8081/api/transfer/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new TransferInfoClient(dataTransfer))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<TransferResult>() {})
                .flatMap(data -> {
                    TransferResult destResult = new TransferResult(
                            data.getStatus(),
                            data.getTransferId());
                    logger.error(data.toString());
                    return Mono.just(destResult);
                })
                .doOnNext(destResult -> {
                    if (destResult.getStatus() != 200) {
                        WebClient.create().post()
                                .uri("http://"+ sourceUrl +":8081/api/rollback_transfer/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .bodyValue(new TransferFinish(dataTransfer))
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<TransferResult>() {})
                                .flatMap(data -> {
                                    TransferResult sourceResult = new TransferResult(
                                            data.getStatus(),
                                            data.getTransferId());
                                    logger.error(data.toString());
                                    return Mono.just(sourceResult);
                                }).subscribe();
//                                .doOnNext(sourceResult -> {
//                                    if (sourceResult.equals(new TransferResult())) {
//                                        // add transfer error
//                                    }
//                                });
                    }
                    else {
                        logger.error("1");
                        WebClient.create().post()
                                .uri("http://"+sourceUrl+":8081/api/commit_transfer/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .bodyValue(new TransferFinish(dataTransfer))
                                .retrieve()
                                .bodyToMono(new ParameterizedTypeReference<TransferResult>() {})
                                .subscribe();
                        // add if error add transfer error and rollback dest card
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
