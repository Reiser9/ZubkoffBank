package com.example.controller;

import com.example.dto.CommissionData;
import com.example.dto.TransferData;
import com.example.dto.TransferUserInfo;
import com.example.enums.CodeType;
import com.example.exception.InsufficientFundsException;
import com.example.exception.NoActiveSubscribeException;
import com.example.exception.UnknownRecipientException;
import com.example.model.Card;
import com.example.model.User;
import com.example.payload.CommissionResponse;
import com.example.payload.DefaultResponse;
import com.example.security.JwtRequestFilter;
import com.example.service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
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
    @Value("${bank.organization}")
    private String organization;
    @Value("${bank.id}")
    private String code;
    @Autowired
    private TelegramService telegramService;
    @Autowired
    private SubscribeService subscribeService;
    @Autowired
    private UserService userService;
    @Autowired
    private CardService cardService;

    @PostMapping("/info")
    public Mono<ResponseEntity<?>> getInfoByPhoneAndOrganization(@RequestBody TransferUserInfo transfer) {
        if (transfer.getCardNum() != null) {
            transfer.setPhoneNum(userService.findById(cardService.findCardByCardNum(transfer.getCardNum()).getUserId()).getPhoneNum());
        }
        return transferService.getInfoByPhone(transfer)
                .map(response -> ResponseEntity.ok(response).getBody());
    }

    @PostMapping("/info_banks")
    public Mono<ResponseEntity<?>> getInfoBanksByPhoneNum(@RequestBody TransferUserInfo transfer) {
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

    @PostMapping("/commission")
    public ResponseEntity<?> getCommissionTransfer(Principal principal, @RequestBody CommissionData commissionData) {
        User user = null;
        if (commissionData.getCardNum() != null) {
            user = userService.findById(cardService.findCardByCardNum(commissionData.getCardNum()).getUserId());
        }
        else {
            user = userService.findUserByPhoneNum(commissionData.getPhoneNum());
        }
        if (user != null) {
            return ResponseEntity.ok(new CommissionResponse(1.00));
        }
        else {
            if (userService.findUserByPhoneNum(principal.getName()).getCards().stream().filter(e -> e.getCardNum().equals(commissionData.getSourceCardNum())).findFirst().get().getRemainsLimit() - commissionData.getMoney() < 0)
                return ResponseEntity.ok(new CommissionResponse(1.02));
            return ResponseEntity.ok(new CommissionResponse(1.00));
        }

    }

    @PostMapping("/")
    @Transactional
    public ResponseEntity<?> sendMoney(Principal data, @RequestBody TransferData transfer) {
        try {
            if (transfer.getMessage().length() > 100) {
                return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "The message is more than 100 characters"));
            }
            if (transfer.getMoney() >= 100000) {
                if (!telegramService.compareCode(data.getName(), transfer.getCodeConfirm(), CodeType.TRANSFER.toString())) {
                    return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Invalid code"));
                }
            }
            Card sourceCard = cardService.findCardByCardNum(transfer.getCardNum());
            if (userService.findUserByPhoneNum(data.getName()).getCards()
                    .stream().filter(e -> e.getId() == sourceCard.getId()).findFirst().orElse(null) == null)
                throw new NullPointerException();
            if (sourceCard.getBalance() < transfer.getMoney()) {
                throw new InsufficientFundsException();
            }
            transfer.setOrganization(organization);
            transfer.setCode(code);
            User user = null;
            if (transfer.getDestCardNum() != null) {
                user = userService.findById(cardService.findCardByCardNum(transfer.getDestCardNum()).getUserId());
                transfer.setDestPhoneNum(user.getPhoneNum());
            }
            else {
                user = userService.findUserByPhoneNum(transfer.getDestPhoneNum());
            }
            if (transfer.getDestOrganization().equals(transfer.getOrganization())) {
                Card destCard = user.getCards().stream().filter(e -> !e.isLock()).findFirst().orElse(null);
                if (destCard != null) {
                    transferService.sendInBank(sourceCard, destCard, transfer.getMoney(), transfer.getMessage());
                }
                else {
                    throw new UnknownRecipientException();
                }
            }
            else {
                if (transfer.getMoney() >= sourceCard.getRemainsLimit()) {
                    if (sourceCard.getBalance() - (transfer.getMoney() * 1.02) < 0) {
                        throw new InsufficientFundsException();
                    }
                }
                final boolean[] isSubscribeSuccessful = { false };
                userService.isSubscribed(user).flatMap(result -> {
                    if (result == 200)
                    {
                        isSubscribeSuccessful[0] = true;
                    }
                    return null;
                }).subscribe();
                if (userService.findUserByPhoneNum(data.getName()).getUserSubscribes().stream()
                        .filter(e -> e.getSubscribe().getId() == 1 && e.isStatus()).findFirst().orElse(null) == null || !isSubscribeSuccessful[0]) {
                    throw new NoActiveSubscribeException();
                }
                transferService.sendOutBank(sourceCard, transfer.getMoney(), transfer);
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
        catch (NoActiveSubscribeException exception) {
            return ResponseEntity.badRequest().body(new DefaultResponse("Not successful", "The recipient or you do not have an active subscription"));
        }
        catch (UnknownRecipientException exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown recipient"));
        }
        catch (Exception exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown error"));
        }
    }
}
