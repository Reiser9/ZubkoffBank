package com.nspk.service;

import com.nspk.dto.TransferInfoClient;
import com.nspk.dto.TransferResult;
import com.nspk.dto.TransferFinish;
import com.nspk.enums.TransferStatus;
import com.nspk.model.Transfer;
import com.nspk.repository.BankRepository;
import com.nspk.repository.TransferRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @Transactional
    public void sendMoneyToUserByPhoneAndOrganization(String sourceUrl, String destUrl, Map<String, String> dataTransfer) {
        Transfer transfer = new Transfer();
        Timestamp timestamp = new Timestamp(Calendar.getInstance().getTime().getTime());
        transfer.setDate(timestamp);
        transfer.setStatus(true);
        transfer.setSourceBank(bankRepository.findByOrganization(dataTransfer.get("organization")));
        transfer.setMoney(dataTransfer.get("money"));
        transfer.setSourceCardNum(dataTransfer.get("cardNum"));
        transfer.setDestBank(bankRepository.findByOrganization(dataTransfer.get("destOrganization")));
        transfer.setDestPhoneNum(dataTransfer.get("destPhoneNum"));
        logger.error("a");
        transferRepository.save(transfer);
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
                                    return Mono.just(sourceResult);
                                }).doOnNext(sourceResult -> {
                                    if (sourceResult.getStatus() != 200) {
                                        Transfer errorTransfer = transferRepository.findByDate(timestamp);
                                        errorTransfer.setStatus(false);
                                        transferRepository.save(errorTransfer);
                                    }
                                }).subscribe();
                    }
                    else {
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
    }
}
