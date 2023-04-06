package com.example.controller;

import com.example.exception.InsufficientFundsException;
import com.example.exception.UnknownRecipientException;
import com.example.model.Card;
import com.example.model.Transfer;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.service.CardService;
import com.example.service.TransferService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/transfer")
public class UserTransferController {
    @Autowired
    private TransferService transferService;
    @Autowired
    private UserService userService;
    @Autowired
    private CardService cardService;
    @Value("${bank.organization}")
    @Autowired
    private String organization;

    @PostMapping("/transfer_info")
    public Mono<ResponseEntity<?>> getInfoByPhoneAndOrganization(@RequestBody Map<String, String> transfer) {
        return transferService.getInfoByPhone(transfer)
                .map(response -> ResponseEntity.ok(response).getBody());
    }

    @PostMapping("/in_bank_send")
    public ResponseEntity<?> sendMoneyInBank(Principal user, @RequestBody Map<String, String> transfer) {
        try {
            List<Card> cards = userService.findUserByPhoneNum(transfer.get("destPhoneNum")).getCards();
            Card sourceCard = cardService.findCardByCardNum(transfer.get("sourceCardNum"));
            Double money = Double.parseDouble(transfer.get("money"));
            if (userService.findUserByPhoneNum(user.getName()).getCards().contains(sourceCard))
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
                List<Transfer> sourceTransfers = destCard.getTransfers();
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
                destTransfers.add(destTransfer);
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
}
