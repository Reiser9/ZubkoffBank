package com.example.service;

import com.example.dto.BankInfo;
import com.example.dto.TransferData;
import com.example.dto.TransferUserInfo;
import com.example.enums.TransferStatus;
import com.example.enums.TransferType;
import com.example.exception.NoActiveSubscribeException;
import com.example.model.Card;
import com.example.model.Subscribe;
import com.example.model.Transfer;
import com.example.dto.TransferInfo;
import com.example.model.UserSubscribe;
import com.example.repository.CardRepository;
import com.example.repository.TransferRepository;
import com.example.repository.UserRepository;
import com.example.producer.TransferProducer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.awt.print.Pageable;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service
@Getter
@Setter
public class TransferService {
    private static final Logger logger = LoggerFactory.getLogger(String.class);
    @Value("${nspk.url}")
    private String url;
    @Value("${nspk.port}")
    private String port;
    @Value("${bank.organization}")
    private String organization;
    @Value("${bank.id}")
    private String code;
    @Autowired
    private TransferProducer transferProducer;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransferRepository transferRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private ObjectMapper objectMapper;

    public Page<Transfer> findTopNByDateAfterOrderByDateAsc(Long id, int offset, int limit) {
        return transferRepository.findTopNOrderByDateAsc(id, PageRequest.of(offset, limit));
    }

    public Transfer findTransferById(long id) {
        return transferRepository.findById(id).get();
    }

    public void sendInBank(Card sourceCard, Card destCard, Double money, String message) {
        destCard.setBalance(destCard.getBalance() + money);
        sourceCard.setBalance(sourceCard.getBalance() - money);
        List<Transfer> sourceTransfers = sourceCard.getTransfers();
        List<Transfer> destTransfers = destCard.getTransfers();
        Transfer sourceTransfer = new Transfer();
        Transfer destTransfer = new Transfer();

        sourceTransfer.setBalance(sourceCard.getBalance());
        sourceTransfer.setMoney(money);
        sourceTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
        sourceTransfer.setOrganization(organization);
        sourceTransfer.setCardId(sourceCard.getId());
        sourceTransfer.setComment(message);
        sourceTransfer.setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
        sourceTransfer.setType(TransferType.SEND_STATUS.toString());
        destTransfer.setBalance(destCard.getBalance());
        destTransfer.setMoney(money);
        destTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
        destTransfer.setOrganization(organization);
        destTransfer.setCardId(destCard.getId());
        destTransfer.setComment(message);
        destTransfer.setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
        destTransfer.setType(TransferType.RECEIVE_STATUS.toString());
        sourceTransfers.add(sourceTransfer);
        sourceCard.setTransfers(sourceTransfers);
        destTransfers.add(destTransfer);
        destCard.setTransfers(destTransfers);
        cardRepository.save(sourceCard);
        cardRepository.save(destCard);
    }


    public Transfer createTransferSubscribe(Card card, Subscribe subscribe) {
        Transfer transfer = new Transfer();
        transfer.setBalance(card.getBalance() - subscribe.getMoney());
        transfer.setMoney(subscribe.getMoney());
        transfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
        transfer.setOrganization(organization);
        transfer.setCardId(card.getId());
        transfer.setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
        transfer.setType(TransferType.SUBSCRIBE_STATUS.toString());
        return transfer;
    }


        @Transactional
    public void sendOutBank(Card sourceCard, Double money, TransferData transfer) throws JsonProcessingException {
        List<Transfer> sourceTransfers = sourceCard.getTransfers();
        Transfer sourceTransfer = new Transfer();
        sourceTransfer.setMoney(money);
        sourceTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
        sourceTransfer.setOrganization(transfer.getDestOrganization());
        sourceTransfer.setCardId(sourceCard.getId());
        sourceTransfer.setStatus(TransferStatus.PROCESS_STATUS.toString());
        sourceTransfer.setType(TransferType.SEND_STATUS.toString());
        sourceTransfer.setComment(transfer.getMessage());
        sourceCard.setRemainsLimit(sourceCard.getRemainsLimit() - money);
        if (sourceCard.getRemainsLimit() < 0) {
            double commission = Double.parseDouble(String.format("%.2f", money * 1.02));
            double moneyAndCommission = sourceCard.getBalance() - commission;
            sourceTransfer.setBalance(moneyAndCommission);
            sourceCard.setBalance(moneyAndCommission);
        }
        else {
            sourceTransfer.setBalance(sourceCard.getBalance()-money);
            sourceCard.setBalance(sourceCard.getBalance()-money);
        }
        sourceTransfers.add(sourceTransfer);
        sourceCard.setTransfers(sourceTransfers);
        cardRepository.save(sourceCard);
        transfer.setTransferId(cardRepository.findByCardNum(sourceCard.getCardNum())
                .getTransfers().stream()
                .filter(e -> e.getDate().equals(sourceTransfer.getDate()))
                .findFirst()
                .get()
                .getId());
        sendMoney(transfer);
    }


    public Mono<ResponseEntity<TransferInfo>> getInfoByPhone(TransferUserInfo transfer) {
        return WebClient.create().post()
                .uri("http://" + url + ":" + port + "/transfer/info")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(transfer)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {})
                .flatMap(data -> {
                    TransferInfo transferInfo = new TransferInfo(
                            data.get("fullName"),
                            data.get("phoneNum"),
                            data.get("organization"));
                    return Mono.just(transferInfo);
                })
                .map(ResponseEntity::ok);
    }

    public Mono<ResponseEntity<List<BankInfo>>> getBanksInfoByPhone(TransferUserInfo transfer) {
        return WebClient.create().post()
                .uri("http://" + url + ":" + port + "/transfer/bank_info")
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



    public void sendMoney(TransferData message) throws JsonProcessingException {
        transferProducer.sendMessage(objectMapper.writeValueAsString(message));
    }

}
