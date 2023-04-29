package com.example.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TransferProducer {

    private static final String TOPIC = "transfer-topic";

    @Autowired
    private KafkaTemplate<Object, String> kafkaTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public void sendMessage(Map<String, String> message) throws JsonProcessingException {
        String jsonMessage = objectMapper.writeValueAsString(message);
        kafkaTemplate.send(TOPIC, jsonMessage);
    }
}
