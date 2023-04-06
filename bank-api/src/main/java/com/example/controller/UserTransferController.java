package com.example.controller;

import com.example.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/transfer")
public class UserTransferController {
    @Autowired
    private TransferService transferService;
//    @PostMapping("/phone/send")
//    public void phoneBankTransfer(@RequestBody Map<String, String> transfer) {
//        transferService.sendByPhone(transfer);
//    }

    @PostMapping("/transfer_info")
    public Mono<ResponseEntity<?>> getInfoByPhoneAndOrganization(@RequestBody Map<String, String> transfer) {
        return transferService.getInfoByPhone(transfer)
                .map(response -> ResponseEntity.ok(response).getBody());
    }
}
