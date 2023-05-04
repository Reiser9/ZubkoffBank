package com.example.controller;

import com.example.enums.TransferStatus;
import com.example.enums.TransferType;
import com.example.exception.InsufficientFundsException;
import com.example.exception.UnknownRecipientException;
import com.example.model.Card;
import com.example.model.Transfer;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.security.JwtRequestFilter;
import com.example.service.CardService;
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
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/transfer")
public class UserTransferController {
    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    @Autowired
    private TransferService transferService;
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

    @PostMapping("/in_bank")
    public ResponseEntity<?> sendMoneyInBank(Principal user, @RequestBody Map<String, String> transfer) {
        try {
            List<Card> cards = userService.findUserByPhoneNum(transfer.get("phoneNum")).getCards();
            Card sourceCard = cardService.findCardByCardNum(transfer.get("cardNum"));
            Double money = Double.parseDouble(transfer.get("money"));
            if (userService.findUserByPhoneNum(user.getName()).getCards()
                    .stream().filter(e -> e.getId() == sourceCard.getId()).findFirst().orElse(null) == null)
                throw new NullPointerException();
            if (sourceCard.getBalance() < money) {
                throw new InsufficientFundsException();
            }
            Card destCard = null;
            for (Card card: cards) {
                if (!card.isLock()) {
                    destCard = card;
                    break;
                }
            }
            if (destCard != null) {
                destCard.setBalance(destCard.getBalance() + money);
                sourceCard.setBalance(sourceCard.getBalance() - money);
                List<Transfer> sourceTransfers = sourceCard.getTransfers();
                List<Transfer> destTransfers = destCard.getTransfers();
                Transfer sourceTransfer = new Transfer();
                Transfer destTransfer = new Transfer();

                sourceTransfer.setBalance(sourceCard.getBalance());
                sourceTransfer.setMoney(money);
                sourceTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
                sourceTransfer.setOrganization(organization);
                sourceTransfer.setCardId(sourceCard.getId());

                destTransfer.setBalance(destCard.getBalance());
                destTransfer.setMoney(money);
                destTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
                destTransfer.setOrganization(organization);
                destTransfer.setCardId(destCard.getId());

                sourceTransfers.add(sourceTransfer);
                sourceCard.setTransfers(sourceTransfers);
                destTransfers.add(destTransfer);
                destCard.setTransfers(destTransfers);
                cardService.save(sourceCard);
                cardService.save(destCard);
                return ResponseEntity.ok().body(sourceTransfer);
            }
            else {
                throw new UnknownRecipientException();
            }
        }
        catch (NullPointerException exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Not found card"));
        }
        catch (InsufficientFundsException exception) {
            return ResponseEntity.status(402).body(new DefaultResponse("Not successful", "Insufficient funds"));
        }
        catch (UnknownRecipientException exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown recipient"));
        }
    }

    @PostMapping("/out_bank")
    @Transactional
    public ResponseEntity<?> sendMoneyOutBank(Principal user, @RequestBody Map<String, String> transfer) {
        try {
            Double money = Double.parseDouble(transfer.get("money"));
            Card sourceCard = cardService.findCardByCardNum(transfer.get("cardNum"));
            if (userService.findUserByPhoneNum(user.getName()).getCards()
                    .stream().filter(e -> e.getId() == sourceCard.getId()).findFirst().orElse(null) == null)
                throw new NullPointerException();
            if (sourceCard.getBalance() < money) {
                throw new InsufficientFundsException();
            }
            List<Transfer> sourceTransfers = sourceCard.getTransfers();

            Transfer sourceTransfer = new Transfer();
            sourceTransfer.setBalance(sourceCard.getBalance()-money);
            sourceTransfer.setMoney(money);
            sourceTransfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
            sourceTransfer.setOrganization(transfer.get("destOrganization"));
            sourceTransfer.setCardId(sourceCard.getId());
            sourceTransfer.setStatus(TransferStatus.PROCESS_STATUS.toString());
            sourceTransfer.setType(TransferType.SEND_STATUS.toString());
            sourceTransfers.add(sourceTransfer);
            sourceCard.setTransfers(sourceTransfers);
            sourceCard.setBalance(sourceCard.getBalance()-money);
            cardService.save(sourceCard);
            transfer.put("transferId", String.valueOf(cardService.findCardByCardNum(sourceCard.getCardNum())
                    .getTransfers().stream()
                    .filter(e -> e.getDate().equals(sourceTransfer.getDate()))
                    .findFirst()
                    .get()
                    .getId()));
            try {
                transferService.sendMoney(transfer);
            } catch (JsonProcessingException e) {
                return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown error"));
            }
            return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
        }
        catch (NullPointerException exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Not found card"));
        }
        catch (InsufficientFundsException exception) {
            return ResponseEntity.status(402).body(new DefaultResponse("Not successful", "Insufficient funds"));
        }
        catch (Exception exception) {
            return ResponseEntity.status(404).body(new DefaultResponse("Not successful", "Unknown error"));
        }

    }
}
