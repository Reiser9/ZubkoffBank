package com.nspk.controller;

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

import java.util.Collections;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/transfer")
public class TransferController {
    @Autowired
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(String.class);

    @Autowired
    private BankService bankService;

    @Autowired
    private TransferService transferService;

    @PostMapping(value = "/check_register", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkRegister(@RequestBody Map<String, String> data) throws Exception {
        User user = userService.findUserByPhoneNum(data.get("phoneNum"));
        if (user == null) {
            return ResponseEntity.status(404).body("");
        }
        return ResponseEntity.status(200).body("");
    }

    @PostMapping(value = "/user_register", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> userRegister(@RequestBody Map<String, String> data) throws Exception {
        Bank bank = bankService.findBankByCode(Integer.parseInt(data.get("code")));
        if (bank == null) {
            bankService.createBank(Integer.parseInt(data.get("code")));
        }
        User user = new User();
        user.setPhoneNum(data.get("phoneNum"));
        user.setBanks(Collections.singletonList(
                bankService.findBankByCode(Integer.parseInt(data.get("code")))));
        userService.save(user);
        return ResponseEntity.status(200).body("");
    }

    @PostMapping(value = "/send_without_reg", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sendMoneyWithoutRegister(@RequestBody Map<String, String> data) throws Exception {
        Bank bank = bankService.findBankByCode(Integer.parseInt(data.get("code")));
        if (bank == null) {
            bankService.createBank(Integer.parseInt(data.get("code")));
        }
        User user = new User();
        user.setPhoneNum(data.get("phoneNum"));
        user.setBanks(Collections.singletonList(
                bankService.findBankByCode(Integer.parseInt(data.get("code")))));
        userService.save(user);
        return ResponseEntity.status(200).body("");
    }

    @PostMapping(value = "/info", produces = APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<?>> getInfoByPhoneAndOrganization(@RequestBody Map<String, String> data) {
        return transferService.getInfoByPhoneAndOrganization(
                        bankService.findBankByCode(Integer.parseInt(data.get("code"))).getIp(),
                        data)
                .map(response -> ResponseEntity.ok(response));
    }
}
