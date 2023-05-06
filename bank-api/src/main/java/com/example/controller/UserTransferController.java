package com.example.controller;

import com.example.enums.CodeType;
import com.example.exception.InsufficientFundsException;
import com.example.exception.UnknownRecipientException;
import com.example.model.Card;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.security.JwtRequestFilter;
import com.example.service.CardService;
import com.example.service.TelegramService;
import com.example.service.TransferService;
import com.example.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/user/transfer")
public class UserTransferController {
    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    @Autowired
    private TransferService transferService;
    @Autowired
    private TelegramService telegramService;
    @Autowired
    private UserService userService;
    @Autowired
    private CardService cardService;
    @Value("${bank.organization}")
    @Autowired
    private String organization;

    @PostMapping("/info_phone")
    public Mono<ResponseEntity<?>> getInfoByPhoneAndOrganization(@RequestBody Map<String, String> transfer) {
        return transferService.getInfoByPhone(transfer)
                .map(response -> ResponseEntity.ok(response).getBody());
    }

    @PostMapping("/info_banks")
    public Mono<ResponseEntity<?>> getInfoBanksByPhoneNum(@RequestBody Map<String, String> transfer) {
        return transferService.getBanksInfoByPhone(transfer)
                .map(response -> ResponseEntity.ok(response).getBody());
    }

    @PostMapping("/code")
    @Transactional
    public ResponseEntity<?> sendTransferCode(Principal user) {
        try {
            telegramService.sendCode(user.getName(), CodeType.TRANSFER.toString());
            return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
        }
        catch (TelegramApiException exception) {
            return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "User did not link the account"));
        }
        catch (NullPointerException exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
        }
    }

    @PostMapping("/")
    @Transactional
    public ResponseEntity<?> sendMoneyOutBank(Principal data, @RequestBody Map<String, String> transfer) {
        try {
            Double money = Double.parseDouble(transfer.get("money"));
            if (money >= 100000) {
                if (!telegramService.compareCode(data.getName(), Integer.parseInt(transfer.get("code")), CodeType.TRANSFER.toString())) {
                    return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Invalid code"));
                }
            }
            Card sourceCard = cardService.findCardByCardNum(transfer.get("cardNum"));
            if (userService.findUserByPhoneNum(data.getName()).getCards()
                    .stream().filter(e -> e.getId() == sourceCard.getId()).findFirst().orElse(null) == null)
                throw new NullPointerException();
            if (sourceCard.getBalance() < money) {
                throw new InsufficientFundsException();
            }
            User user = userService.findUserByPhoneNum(transfer.get("destPhoneNum"));
//            if (user != null) {
            if (!transfer.get("destOrganization").equals(transfer.get("organization"))) {
                Card destCard = user.getCards().stream().filter(e -> !e.isLock()).findFirst().orElse(null);
                if (destCard != null) {
                    transferService.sendInBank(sourceCard, destCard, money);
                }
                else {
                    throw new UnknownRecipientException();
                }
            }
            else {
                transferService.sendOutBank(sourceCard, money, transfer);
            }
            return ResponseEntity.badRequest().body(new DefaultResponse("Successful", ""));
       }
        catch (NullPointerException exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Not found card"));
        }
        catch (JsonProcessingException e) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown error"));
        }
        catch (InsufficientFundsException exception) {
            return ResponseEntity.status(402).body(new DefaultResponse("Not successful", "Insufficient funds"));
        }
        catch (UnknownRecipientException exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown recipient"));
        }
        catch (Exception exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown error"));
        }
    }
}
