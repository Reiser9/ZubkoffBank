package com.nspk.controller;

import com.nspk.dto.SubscribeInfo;
import com.nspk.model.Bank;
import com.nspk.model.User;
import com.nspk.service.BankService;
import com.nspk.service.TransferService;
import com.nspk.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/")
public class SubscribeController {
    @Autowired
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(String.class);

    @Autowired
    private BankService bankService;

    @Autowired
    private TransferService transferService;

    @PostMapping(value = "/subscribe", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> subscribe(@RequestBody SubscribeInfo subscribeInfo) {
        try {
            Bank bank = bankService.findBankByCode(subscribeInfo.getCode());
            User user = userService.findUserByPhoneNum(subscribeInfo.getPhoneNum());
            if (user == null)
                user = new User();
            user.setPhoneNum(subscribeInfo.getPhoneNum());
            List<Bank> banks = user.getBanks() == null ? new ArrayList<>() : user.getBanks();
            if (banks == null || !banks.contains(bank)) {
                banks.add(bank);
                user.setBanks(banks);
                userService.save(user);
            }
            return ResponseEntity.status(200).body("");
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest().body("");
        }

    }

    @PostMapping(value = "/subscribe_check_user", produces = APPLICATION_JSON_VALUE)
    public Mono<Map<String, String>> isSubscribed(@RequestBody SubscribeInfo subscribeInfo) {
        return userService.isSubscribed(bankService.findBankByCode(subscribeInfo.getCode()).getIp(), subscribeInfo);

    }
}
