package com.nspk.service;

import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

//@Component
//public class KafkaConsumer {
//    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(String.class);
//    private static final String TOPIC = "transfer-topic";
//
//    @KafkaListener(topics = TOPIC, groupId = "test-group")
//    public void consume(String message) {
//        logger.error(message);
//    }
//}
