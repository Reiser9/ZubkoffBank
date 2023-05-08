package com.nspk.controller;

import com.nspk.dto.BankInfo;
import com.nspk.dto.SubscribeInfo;
import com.nspk.dto.TransferUserInfo;
import com.nspk.model.Bank;
import com.nspk.model.User;
import com.nspk.payload.DefaultResponse;
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
@RequestMapping("/transfer")
public class TransferController {
    @Autowired
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(String.class);

    @Autowired
    private BankService bankService;

    @Autowired
    private TransferService transferService;



    @PostMapping(value = "/bank_info", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBankInfoByPhone(@RequestBody TransferUserInfo data) throws Exception {
        List<Bank> banks = null;
        try {
            banks = userService.findUserByPhoneNum(data.getPhoneNum()).getBanks();
            return ResponseEntity.status(200).body(banks.stream().map(bank -> new BankInfo(bank)));
        }
        catch (NullPointerException exception) {
            return ResponseEntity.status(404).body(banks);
        }
    }

    @PostMapping(value = "/info", produces = APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<?>> getInfoByPhoneAndOrganization(@RequestBody TransferUserInfo data) {
        return transferService.getInfoByPhoneAndOrganization(
                        bankService.findBankByCode(data.getCode()).getIp(),
                        data)
                .map(response -> ResponseEntity.ok(response));
    }
}
