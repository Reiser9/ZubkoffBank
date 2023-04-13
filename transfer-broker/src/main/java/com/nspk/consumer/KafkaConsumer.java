package com.nspk.consumer;

import com.nspk.dto.TransferInfo;
import com.nspk.service.BankService;
import com.nspk.service.TransferService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
public class KafkaConsumer {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(String.class);
    private static final String TOPIC = "transfer-topic";
    @Autowired
    private TransferService transferService;
    @Autowired
    private BankService bankService;

    @KafkaListener(topics = TOPIC, groupId = "transfer-group")
    public void consume(Map<String, String> message) {
//        TransferInfo transferInfo = new TransferInfo();
//        transferService.getInfoByPhoneAndOrganization(
//                bankService.findBankByCode(Integer.parseInt(message.get("code"))).getIp(), message).subscribe(data -> {
//                    transferInfo.setCardNum(data.get("cardNum"));
//                    transferInfo.setFullName(data.get("fullName"));
//                    transferInfo.setPhoneNum(data.get("phoneNum"));
//                    transferInfo.setOrganization(data.get("organization"));
//                }
//        );
        transferService.sendMoneyToUserByPhoneAndOrganization(
                bankService.findBankByCode(Integer.parseInt(message.get("code"))).getIp(), message);

    }

}
