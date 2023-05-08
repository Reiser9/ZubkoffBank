package com.example.controller;

import com.example.dto.CardData;
import com.example.dto.UserData;
import com.example.dto.UserPassword;
import com.example.enums.TransferStatus;
import com.example.enums.TransferType;
import com.example.enums.UserVerify;
import com.example.exception.InsufficientFundsException;
import com.example.model.*;
import com.example.payload.*;
import com.example.service.*;
import org.glassfish.grizzly.utils.ArraySet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Value("${path.img}")
	private String link;
	@Value("${bank.id}")
	private String bankId;
	@Value("${bank.organization}")
	private String organization;
	@Autowired
	private UserService userService;
	@Autowired
	private RefreshTokenService refreshTokenService;
	@Autowired
	private TypeService typeService;
	@Autowired
	private CardService cardService;
	@Autowired
	private UserSubscribeService userSubscribeService;
	@Autowired
	private SubscribeService subscribeService;
	@Autowired
	private PasswordEncoder passwordEncoder;


	@GetMapping("/cards")
	public ResponseEntity<?> findCardByUser(Principal user) {
		try {
			return ResponseEntity.ok(cardService.findCardByUserId(userService.findUserByPhoneNum(user.getName()).getId()).stream().map(card -> new CardResponse(card, link)));
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user card"));
		}
	}

	@GetMapping("/short_info")
	public ResponseEntity<?> getShortInfoUser(Principal user) {
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			DataUser dataUser = userInfo.getDataUsers().get(userInfo.getDataUsers().size()-1);
			return ResponseEntity.ok(new ShortInfoUserResponse(
					userInfo.getId(),
					userInfo.getPhoneNum(),
					userInfo.getVerify(),
					userInfo.getRoles().stream().map(Role::getRole).collect(Collectors.toList()),
					dataUser.getFirstName()));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}

	}

	@GetMapping("/full_info")
	public ResponseEntity<?> getFullInfoUser(Principal user) {
		User userInfo = userService.findUserByPhoneNum(user.getName());
		DataUser dataUser = userInfo.getDataUsers().get(userInfo.getDataUsers().size()-1);
		return ResponseEntity.ok(new FullInfoUserResponse(
				userInfo.getId(), userInfo.getPhoneNum(),
				userInfo.getVerify(),
				userInfo.getRoles().stream().map(Role::getRole).collect(Collectors.toList()),
				dataUser.getFirstName(),
				dataUser.getSecondName(),
				dataUser.getMiddleName(),
				dataUser.getPassportNum(),
				dataUser.getPassportSer(),
				dataUser.getBirthdate(),
				dataUser.getGranted(),
				dataUser.getGrantedDate(),
				dataUser.getSex()));
	}

	@PostMapping("/card/block")
	public ResponseEntity<?> setBlock(Principal user, @RequestBody Map<String, String> data) {
		try {
			Card card = cardService.findCardById(Long.parseLong(data.get("id")));
			List<Card> cards = userService.findUserByPhoneNum(user.getName()).getCards();
			if (cards.stream().anyMatch(e -> e.getId() == Long.parseLong(data.get("id")))) {
				card.setLock(true);
				cardService.save(card);
				return ResponseEntity.ok(new CardResponse(card, link));
			}
			return ResponseEntity.status(403).body(new DefaultResponse("Not Successful", "Forbidden"));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@GetMapping("/subscribes")
	public ResponseEntity<?> getSubscribe(Principal userData) {
		User user = userService.findUserByPhoneNum(userData.getName());
		return ResponseEntity.ok().body(user.getUserSubscribes().stream().map(SubscribeUserResponse::new));
	}

	@PostMapping("/unsubscribe")
	public ResponseEntity<?> unsubscribe(Principal userData, @RequestBody Map<String, String> data) {
		Subscribe subscribe = subscribeService.findSubscribeById(Integer.parseInt(data.get("id")));
		User user = userService.findUserByPhoneNum(userData.getName());
		UserSubscribe userSubscribe = userSubscribeService.findUserSubscribeByUserAndSubscribe(user, subscribe);
		if (userSubscribe != null)
		{
			userSubscribe.setStatus(false);
			userSubscribeService.save(userSubscribe);
			return ResponseEntity.ok().body(user.getUserSubscribes().stream().map(SubscribeUserResponse::new));
		}
		else {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found subscribe"));
		}
	}


	@PostMapping("/subscribe")
	public ResponseEntity<?> subscribe(Principal userData, @RequestBody Map<String, Integer> data) {
		try {
			Subscribe subscribe = subscribeService.findSubscribeById(data.get("id"));
			User user = userService.findUserByPhoneNum(userData.getName());
			UserSubscribe userSubscribe = userSubscribeService.findUserSubscribeByUserAndSubscribe(user, subscribe);
			if (userSubscribe != null)
			{
				Card card = user.getCards().stream().filter(e -> e.getBalance() >= subscribe.getMoney() && !e.isLock()).findFirst().orElse(null);
				if (card != null) {
					userSubscribe.setStatus(true);
					card.setBalance(card.getBalance() - subscribe.getMoney());
					Transfer transfer = new Transfer();
					transfer.setBalance(card.getBalance() - userSubscribe.getSubscribe().getMoney());
					transfer.setMoney(userSubscribe.getSubscribe().getMoney());
					transfer.setDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
					transfer.setOrganization(organization);
					transfer.setCardId(card.getId());
					transfer.setStatus(TransferStatus.SUCCESSFULLY_STATUS.toString());
					transfer.setType(TransferType.SUBSCRIBE_STATUS.toString());
					List<Transfer> transfers = card.getTransfers();
					transfers.add(transfer);
					card.setTransfers(transfers);
					cardService.save(card);
					userSubscribeService.save(userSubscribe);
				}
				else {
					throw new InsufficientFundsException();
				}
				return ResponseEntity.ok().body(user.getUserSubscribes().stream().map(SubscribeUserResponse::new));
			}
			if (user.getCards().stream().filter(e -> e.getBalance() >= subscribe.getMoney()).findFirst().orElse(null) == null)
			{
				throw new InsufficientFundsException();
			}
			if (!subscribe.isSource()) {
				 subscribeService.subscribe(user).flatMap(result -> {
					 if (result == 200)
					 {
						 Calendar cal = Calendar.getInstance();
						 cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
						 cal.add(Calendar.DAY_OF_MONTH, subscribe.getPeriod());
						 Timestamp date = new Timestamp(cal.getTime().getTime());
						 UserSubscribe newUserSubscribe = new UserSubscribe();
						 newUserSubscribe.setSubscribe(subscribe);
						 newUserSubscribe.setUser(user);
						 newUserSubscribe.setDatePayment(date);
						 newUserSubscribe.setStatus(true);
						 List<UserSubscribe> userSubscribes = user.getUserSubscribes();
						 userSubscribes.add(newUserSubscribe);
						 user.setUserSubscribes(userSubscribes);
						 userService.save(user);
						 return Mono.just(ResponseEntity.ok().body(userService.findUserByPhoneNum(userData.getName()).getUserSubscribes().stream().map(SubscribeUserResponse::new)));
					 }
					 else {
						 return Mono.just(ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Unknown error")));
					 }
				 }).subscribe();
			}
			else {
				Calendar cal = Calendar.getInstance();
				cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
				cal.add(Calendar.DAY_OF_MONTH, subscribe.getPeriod());
				Timestamp date = new Timestamp(cal.getTime().getTime());
				UserSubscribe newUserSubscribe = new UserSubscribe();
				newUserSubscribe.setSubscribe(subscribe);
				newUserSubscribe.setUser(user);
				newUserSubscribe.setDatePayment(date);
				newUserSubscribe.setStatus(true);
				userSubscribeService.save(newUserSubscribe);
			}
			return ResponseEntity.ok().body(userSubscribeService.findUserSubscribeByUser(user).stream().map(SubscribeUserResponse::new));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found subscribe"));
		} catch (InsufficientFundsException exception) {
			return ResponseEntity.status(402).body(new DefaultResponse("Not successful", "Insufficient funds"));
		}

	}

	@PostMapping("/card")
	public ResponseEntity<?> createCard(Principal user, @RequestBody CardData data) {
		if (!typeService.isExistType(data.getTypeId()))
			return ResponseEntity.badRequest().body(
					new DefaultResponse("Not Successful", "Invalid card type"));
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			Card newCard = cardService.createCard(data, bankId);
			userInfo.getCards().add(newCard);
			userInfo.setCards(userInfo.getCards());
			userService.save(userInfo);
			return ResponseEntity.ok(new CardResponse(cardService.findCardByCardNum(newCard.getCardNum()), link));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logoutUser(Principal user) {
		refreshTokenService.deleteByUserId(userService.findUserByPhoneNum(user.getName()).getId());
		return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
	}

	@PostMapping("/data")
	public ResponseEntity<?> updateDataUser(Principal user, @RequestBody UserData data) throws ParseException {
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			return ResponseEntity.ok(new FullInfoUserResponse(userService.setDataUser(userInfo, data)));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
		catch (ParseException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Incorrect date format"));
		}
	}

	@PostMapping("/cancel_data")
	public ResponseEntity<?> updateDataUser(Principal user) {
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			userInfo.setVerify(UserVerify.NOT_VERIFIED_STATUS.toString());
			userService.save(userInfo);
			return ResponseEntity.ok(new FullInfoUserResponse(userInfo));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/change_pass")
	public ResponseEntity<?> changePassword(Principal user, @RequestBody UserPassword data) {
		try {
			if (data.getNewPassword().length() >= 8 && data.getNewPassword().length() <= 35) {
				User userByPhoneNum = userService.findUserByPhoneNum(user.getName());
				if (passwordEncoder.matches(data.getPassword(), userByPhoneNum.getPassword())) {
					userByPhoneNum.setPassword(passwordEncoder.encode(data.getNewPassword()));
					userService.save(userByPhoneNum);
					refreshTokenService.deleteByUserId(userService.findUserByPhoneNum(user.getName()).getId());
					return ResponseEntity.ok(new DefaultResponse("Successful", ""));
				} else {
					return ResponseEntity.status(401).body(new DefaultResponse("Not Successful", "Wrong password"));
				}
			}
			else {
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Password is too short/long"));
			}
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@DeleteMapping("/")
	public ResponseEntity<?> deleteAccount(Principal user, @RequestBody Map<String, String> data) {
		try {
				User userByPhoneNum = userService.findUserByPhoneNum(user.getName());
				if (passwordEncoder.matches(data.get("password"), userByPhoneNum.getPassword())) {
					userByPhoneNum.setRoles(new ArrayList<>());
					userByPhoneNum.setCodes(new ArrayList<>());
					userByPhoneNum.setDataUsers(new ArrayList<>());
					userByPhoneNum.setCards(new ArrayList<>());
					refreshTokenService.deleteByUserId(userService.findUserByPhoneNum(user.getName()).getId());
					userService.save(userByPhoneNum);
					userService.deleteByPhoneNum(user.getName());
					return ResponseEntity.ok(new DefaultResponse("Successful", ""));
				} else {
					return ResponseEntity.status(401).body(new DefaultResponse("Not Successful", "Wrong password"));
				}
			}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}
}
