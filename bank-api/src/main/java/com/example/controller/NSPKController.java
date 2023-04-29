package com.example.controller;

import com.example.enums.TransferStatus;
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
    private String oraganization;
    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    @PostMapping(value = "/transfer/info", produces = APPLICATION_JSON_VALUE)
    public TransferInfo getTransferInfo(@RequestBody Map<String, String> transfer) throws Exception {
        try {
            User user = userService.findUserByPhoneNum(transfer.get("phoneNum"));
            DataUser dataUser = user.getDataUsers().get(user.getDataUsers().size()-1);
            String fullName = dataUser.getSecondName() + " " + dataUser.getFirstName();
            TransferInfo transferInfo = new TransferInfo(fullName,
                    user.getPhoneNum(), user.getCards().get(0).getCardNum(), oraganization);
            return transferInfo;
        }
        catch (NullPointerException exception) {
            return new TransferInfo();
        }
    }

    @PostMapping(value = "/transfer/", produces = APPLICATION_JSON_VALUE)
    public TransferInfo transfer(@RequestBody Map<String, String> transfer) throws Exception {
//        try {
        logger.error(transfer.toString());
        Double money = Double.parseDouble(transfer.get("money"));
        User user = userService.findUserByPhoneNum(transfer.get("phoneNum"));
        Card destCard = null;
        for (Card card: user.getCards()) {
            if (!card.isLock()) {
                destCard = card;
            }
        }
        List<Transfer> destTransfers = destCard.getTransfers();
        Transfer destTransfer = new Transfer();

        destTransfer.setBalance(destCard.getBalance() + money);
        destTransfer.setMoney(money);
        destTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
        destTransfer.setOrganization(transfer.get("organization"));
        destTransfer.setCardId(destCard.getId());
        destTransfer.setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());

        destTransfers.add(destTransfer);
        destCard.setTransfers(destTransfers);
        destCard.setBalance(destCard.getBalance() + money);
        cardService.save(destCard);

        DataUser dataUser = user.getDataUsers().get(user.getDataUsers().size()-1);
        String fullName = dataUser.getSecondName() + " " + dataUser.getFirstName();
        TransferInfo transferInfo = new TransferInfo(fullName,
                user.getPhoneNum(), user.getCards().get(0).getCardNum(), oraganization);
        return transferInfo;
//        }
//        catch (NullPointerException exception) {
//            return new TransferInfo();
//        }
    }

    @PostMapping(value = "/rollback_transfer/", produces = APPLICATION_JSON_VALUE)
    public TransferInfo transferRollback(@RequestBody Map<String, String> data) throws Exception {
        try {
            Card card = cardService.findCardByCardNum(data.get("cardNum"));
            card.getTransfers().stream()
                    .filter(e -> e.getId() == Long.parseLong(data.get("transfer_id"))).findFirst().get()
                    .setStatus(TransferStatus.NOT_SUCCESSFULLY_STATUS.toString());
            card.setBalance(card.getBalance() + Double.parseDouble(data.get("money")));
            cardService.save(card);
            return new TransferInfo("",
                    "", "", oraganization);
//            return card.getTransfers().stream()
//                    .filter(e -> e.getId() == Long.parseLong(data.get("transfer_id"))).findFirst().get();
        }
        catch (NullPointerException exception) {
            return new TransferInfo();
        }
    }

    @PostMapping(value = "/commit_transfer/", produces = APPLICATION_JSON_VALUE)
    public Transfer commitRollback(@RequestBody Map<String, String> data) throws Exception {
        try {
            Card card = cardService.findCardByCardNum(data.get("cardNum"));
            card.getTransfers().stream()
                    .filter(e -> e.getId() == Long.parseLong(data.get("transfer_id"))).findFirst().get()
                    .setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
            card.setBalance(card.getBalance() + Double.parseDouble(data.get("money")));
            cardService.save(card);
            return card.getTransfers().stream()
                    .filter(e -> e.getId() == Long.parseLong(data.get("transfer_id"))).findFirst().get();
        }
        catch (NullPointerException exception) {
            return new Transfer();
        }
    }
}
