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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@EnableScheduling
public class SubscribePayment {
    private static final Logger logger = LoggerFactory.getLogger(SubscribePayment.class);
    @Value("${bank.organization}")
    @Autowired
    private String organization;
    @Autowired
    private UserSubscribeRepository userSubscribeRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private UserRepository userRepository;
//    @Scheduled(fixedDelay = 60 * 60 * 1000) // 1 час
    @Scheduled(fixedDelay = 60 * 1000) // 1 минута
    @Async
    public void payment() {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
        cal.add(Calendar.HOUR, -1);
        Timestamp timestamp = new Timestamp(cal.getTime().getTime());
        List<UserSubscribe> userSubscribes = userSubscribeRepository.findByStatusAndDatePaymentBefore(true, timestamp);
        for (UserSubscribe userSubscribe: userSubscribes) {
            if (TimeUnit.DAYS.convert(Math.abs(timestamp.getTime() - userSubscribe.getDatePayment().getTime()),
                    TimeUnit.MILLISECONDS) >= userSubscribe.getSubscribe().getPeriod()) {
                continue;
            }
            logger.error(userSubscribe.toString());
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
                transfer.setType(TransferType.SUBSCRIBE_STATUS.toString());
                card.getTransfers().add(transfer);
                card.setBalance(card.getBalance() - userSubscribe.getSubscribe().getMoney());
                cardRepository.save(card);

                Calendar calendar = Calendar.getInstance();
                calendar.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
                calendar.add(Calendar.DATE, userSubscribe.getSubscribe().getPeriod());
                userSubscribe.setDatePayment(new Timestamp(calendar.getTime().getTime()));
                userSubscribeRepository.save(userSubscribe);
            }
            else {
                if (user.getCards().size() != 0) {
                    card = user.getCards().get(0);
                    Transfer transfer = new Transfer();
                    transfer.setBalance(card.getBalance());
                    transfer.setMoney(userSubscribe.getSubscribe().getMoney());
                    transfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
                    transfer.setOrganization(organization);
                    transfer.setCardId(card.getId());
                    transfer.setStatus(TransferStatus.NOT_SUCCESSFULLY_STATUS.toString());
                    transfer.setType(TransferType.SUBSCRIBE_STATUS.toString());
                    card.getTransfers().add(transfer);
                    cardRepository.save(card);
                }
                userSubscribe.setStatus(false);
                userSubscribeRepository.save(userSubscribe);
            }
        }
    }
}
