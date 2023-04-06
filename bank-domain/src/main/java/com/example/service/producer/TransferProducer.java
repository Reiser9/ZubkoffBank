package com.example.service.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TransferProducer {

    private static final String TOPIC = "transfer-topic";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(Map<String, String> message) {
        kafkaTemplate.send(TOPIC, String.valueOf(message));
    }
}
