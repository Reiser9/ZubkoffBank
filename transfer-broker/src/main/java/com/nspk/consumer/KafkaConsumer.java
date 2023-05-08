package com.nspk.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nspk.dto.TransferData;
import com.nspk.service.BankService;
import com.nspk.service.TransferService;
import com.nspk.service.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class KafkaConsumer {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(String.class);
    private static final String TOPIC = "transfer-topic";
    @Autowired
    private TransferService transferService;
    @Autowired
    private UserService userService;
    @Autowired
    private BankService bankService;
    @Autowired
    private ObjectMapper objectMapper;
    @KafkaListener(topics = TOPIC, groupId = "transfer-group")
    public void consume(String messageJson) throws JsonProcessingException {
        TransferData transferData = objectMapper.readValue(messageJson, TransferData.class);
        transferService.sendMoneyToUserByPhoneAndOrganization(
                bankService.findBankByCode(Integer.parseInt(transferData.getCode())).getIp(),
                bankService.findBankByCode(Integer.parseInt(transferData.getDestCode())).getIp(),
                transferData);

    }

}
