package com.example.service;

import com.example.enums.TransferStatus;
import com.example.enums.TransferType;
import com.example.model.Card;
import com.example.model.Transfer;
import com.example.model.User;
import com.example.model.UserSubscribe;
import com.example.repository.CardRepository;
import com.example.repository.UserRepository;
import com.example.repository.UserSubscribeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

@Service
public class SubscribePayment {
    @Value("${bank.organization}")
    @Autowired
    private String organization;
    @Autowired
    private UserSubscribeRepository userSubscribeRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private UserRepository userRepository;
    @Scheduled(fixedDelay = 60 * 60 * 1000) // 1 час
    public void payment() {
        List<UserSubscribe> userSubscribes = userSubscribeRepository.findAllByStatus(true);
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
        cal.add(Calendar.HOUR, -1);
        Timestamp timeBefore = new Timestamp(cal.getTime().getTime());
        Timestamp timeNow = new Timestamp(System.currentTimeMillis());
        for (UserSubscribe userSubscribe: userSubscribes) {
            if (timeNow.before(userSubscribe.getDatePayment()) || timeBefore.before(userSubscribe.getDatePayment())) {
                User user = userSubscribe.getUser();
                List<Card> cards = user.getCards();
                Card card = cards.stream().filter(e -> e.getBalance() >= userSubscribe.getSubscribe().getMoney() && !e.isLock()).findFirst().orElse(null);
                if (card != null) {
                    Transfer transfer = new Transfer();
                    transfer.setBalance(card.getBalance() - userSubscribe.getSubscribe().getMoney());
                    transfer.setMoney(userSubscribe.getSubscribe().getMoney());
                    transfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
                    transfer.setOrganization(organization);
                    transfer.setCardId(card.getId());
                    transfer.setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
                    transfer.setType(TransferType.RECEIVE_STATUS.toString());
                    card.getTransfers().add(transfer);
                    card.setBalance(card.getBalance() - userSubscribe.getSubscribe().getMoney());
                    cardRepository.save(card);

                    Calendar calendar = Calendar.getInstance();
                    calendar.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
                    calendar.add(Calendar.DAY_OF_MONTH, 30);
                    userSubscribe.setDatePayment(new Timestamp(cal.getTime().getTime()));
                    userSubscribeRepository.save(userSubscribe);
                }
                else {
                    userSubscribe.setStatus(false);
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
                    calendar.add(Calendar.DAY_OF_MONTH, 30);
                    userSubscribe.setDatePayment(new Timestamp(cal.getTime().getTime()));
                    userSubscribeRepository.save(userSubscribe);
                    Transfer transfer = new Transfer();
                    transfer.setBalance(card.getBalance());
                    transfer.setMoney(userSubscribe.getSubscribe().getMoney());
                    transfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
                    transfer.setOrganization(organization);
                    transfer.setCardId(card.getId());
                    transfer.setStatus(TransferStatus.NOT_SUCCESSFULLY_STATUS.toString());
                    transfer.setType(TransferType.RECEIVE_STATUS.toString());
                    card.getTransfers().add(transfer);
                    cardRepository.save(card);
                }
            }
        }
    }
}
