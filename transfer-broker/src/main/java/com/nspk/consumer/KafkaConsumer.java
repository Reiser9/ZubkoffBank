package com.nspk.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nspk.dto.TransferInfo;
import com.nspk.service.BankService;
import com.nspk.service.TransferService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Map;

@Component
public class KafkaConsumer {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(String.class);
    private static final String TOPIC = "transfer-topic";
    @Autowired
    private TransferService transferService;
    @Autowired
    private BankService bankService;
    @Autowired
    private ObjectMapper objectMapper;
    @KafkaListener(topics = TOPIC, groupId = "transfer-group")
    public void consume(String messageJson) throws JsonProcessingException {
        Map<String, String> message = objectMapper.readValue(messageJson, Map.class);
        transferService.sendMoneyToUserByPhoneAndOrganization(
                bankService.findBankByCode(Integer.parseInt(message.get("code"))).getIp(),
                bankService.findBankByCode(Integer.parseInt(message.get("destCode"))).getIp(),
                message);

    }

}
