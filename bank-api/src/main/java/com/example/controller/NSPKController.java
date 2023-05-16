package com.example.controller;

import com.example.dto.*;
import com.example.enums.TransferStatus;
import com.example.enums.TransferType;
import com.example.model.*;
import com.example.security.JwtRequestFilter;
import com.example.service.CardService;
import com.example.service.TransferService;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NSPKController {
    @Autowired
    private UserService userService;
    @Autowired
    private TransferService transferService;
    @Autowired
    private CardService cardService;
    @Value("${bank.organization}")
    private String organization;
    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    @PostMapping(value = "/subscribe_check_user", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> isSubscribeActive(@RequestBody SubscribeInfo transfer) {
        UserSubscribe userSubscribe = userService.findUserByPhoneNum(transfer.getPhoneNum()).getUserSubscribes().stream()
                .filter(e -> e.getSubscribe().getId() == 1 && e.isStatus()).findFirst().orElse(null);
        if (userSubscribe == null) {
            return ResponseEntity.badRequest().body("");
        }
        else
            return ResponseEntity.ok().body("");
    }

    @PostMapping(value = "/transfer/info", produces = APPLICATION_JSON_VALUE)
    public TransferInfo getTransferInfo(@RequestBody TransferUserInfo transfer) throws Exception {
        try {
            User user = userService.findUserByPhoneNum(transfer.getPhoneNum());
            DataUser dataUser = user.getDataUsers().get(user.getDataUsers().size() - 1);
            String fullName = dataUser.getSecondName() + " " + dataUser.getFirstName();
            TransferInfo transferInfo = new TransferInfo(fullName,
                    user.getPhoneNum(), organization);
            return transferInfo;
        } catch (NullPointerException exception) {
            return new TransferInfo();
        }
    }

    @PostMapping(value = "/transfer/", produces = APPLICATION_JSON_VALUE)
    public TransferResult transfer(@RequestBody TransferUserDest transfer) throws Exception {
        try {
            logger.error(transfer.toString());
            Double money = transfer.getMoney();
            User user = userService.findUserByPhoneNum(transfer.getPhoneNum());
            Card destCard = null;
            for (Card card : user.getCards()) {
                if (!card.isLock()) {
                    destCard = card;
                }
            }
            List<Transfer> destTransfers = destCard.getTransfers();
            Transfer destTransfer = new Transfer();

            destTransfer.setBalance(destCard.getBalance() + money);
            destTransfer.setMoney(money);
            destTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
            destTransfer.setOrganization(transfer.getOrganization());
            destTransfer.setCardId(destCard.getId());
            destTransfer.setComment(transfer.getMessage());
            destTransfer.setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
            destTransfer.setType(TransferType.RECEIVE_STATUS.toString());
            destTransfers.add(destTransfer);
            destCard.setTransfers(destTransfers);
            destCard.setBalance(destCard.getBalance() + money);
            cardService.save(destCard);

            DataUser dataUser = user.getDataUsers().get(user.getDataUsers().size() - 1);
            TransferResult transferResult = new TransferResult(200, destTransfer.getId());
            return transferResult;
        } catch (NullPointerException exception) {
            return new TransferResult(504, -1);
        }
    }

    @PostMapping(value = "/rollback_transfer/", produces = APPLICATION_JSON_VALUE)
    public TransferResult transferRollback(@RequestBody TransferFinish data) throws Exception {
        try {
            Card card = cardService.findCardByCardNum(data.getCardNum());
            card.getTransfers().stream()
                    .filter(e -> e.getId() == data.getTransferId()).findFirst().get()
                    .setStatus(TransferStatus.NOT_SUCCESSFULLY_STATUS.toString());
            if (card.getRemainsLimit() < 0) {
                double commission = Double.parseDouble(String.format("%.2f",
                        card.getBalance() + (data.getMoney() * 1.02)));
                card.setBalance(commission);
            }
            else {
                card.setBalance(card.getBalance() + data.getMoney());
            }
            card.setRemainsLimit(card.getType().getLimit() + data.getMoney());
            cardService.save(card);
            return new TransferResult(200, data.getTransferId());
        } catch (NullPointerException exception) {
            return new TransferResult(504, -1);
        }
    }

    @PostMapping(value = "/commit_transfer/", produces = APPLICATION_JSON_VALUE)
    public TransferResult commitRollback(@RequestBody TransferFinish data) throws Exception {
        try {
            Card card = cardService.findCardByCardNum(data.getCardNum());
            card.getTransfers().stream()
                    .filter(e -> e.getId() == data.getTransferId()).findFirst().get()
                    .setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
            cardService.save(card);
            return new TransferResult(200, data.getTransferId());
        } catch (NullPointerException exception) {
            return new TransferResult(504, -1);
        }
    }
}

