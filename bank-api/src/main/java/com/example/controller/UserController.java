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
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
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
	private TransferService transferService;
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
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found card"));
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
			if (card.getBalance() != 0) {
				return ResponseEntity.status(402).body(new DefaultResponse("Not Successful", "There is money on the balance"));
			}
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
		return ResponseEntity.ok().body(user.getUserSubscribes().stream().map(e -> new SubscribeUserResponse(e, link)));
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
			return ResponseEntity.ok().body(userService.findUserByPhoneNum(userData.getName()).getUserSubscribes().stream().map(e -> new SubscribeUserResponse(e, link)));
		}
		else {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found subscribe"));
		}
	}


	@PostMapping("/subscribe")
	@Transactional
	public ResponseEntity<?> subscribe(Principal userData, @RequestBody Map<String, Integer> data) {

		try {
			Subscribe subscribe = subscribeService.findSubscribeById(data.get("id"));
			User user = userService.findUserByPhoneNum(userData.getName());
			UserSubscribe userSubscribe = userSubscribeService.findUserSubscribeByUserAndSubscribe(user, subscribe);
			Card card = user.getCards().stream().filter(e -> e.getBalance() >= subscribe.getMoney() && !e.isLock()).findFirst().orElse(null);
			if (user.getCards().stream().filter(e -> e.getBalance() >= subscribe.getMoney()).findFirst().orElse(null) == null)
			{
				throw new InsufficientFundsException();
			}
			if (userSubscribe != null)
			{
				user.getUserSubscribes().stream().filter(e -> e.getId().equals(userSubscribe.getId())).findFirst().get().setStatus(true);
				List<Transfer> transfers = card.getTransfers();
				transfers.add(transferService.createTransferSubscribe(card, subscribe));
				card.setBalance(card.getBalance() - subscribe.getMoney());
				card.setTransfers(transfers);
				cardService.save(card);
				userService.save(user);
				return ResponseEntity.ok().body(user.getUserSubscribes().stream().map(e -> new SubscribeUserResponse(e, link)));
			}
			final boolean[] isSubscribeSuccessful = { false };
			if (!subscribe.isSource()) {
				 subscribeService.subscribe(user).flatMap(result -> {
					 if (result == 200)
					 {
						 isSubscribeSuccessful[0] = true;
					 }
					 return null;
				 }).subscribe();
			}
			if (isSubscribeSuccessful[0] || subscribe.isSource()) {
				List<UserSubscribe> userSubscribes = user.getUserSubscribes() == null ? new ArrayList<>() : user.getUserSubscribes();
				userSubscribes.add(userSubscribeService.createUserSubscribe(user, subscribe));
				user.setUserSubscribes(userSubscribes);
				List<Transfer> transfers = card.getTransfers();
				transfers.add(transferService.createTransferSubscribe(card, subscribe));
				card.setTransfers(transfers);
				card.setBalance(card.getBalance() - subscribe.getMoney());
				cardService.save(card);
				userService.save(user);
			}
			return ResponseEntity.ok().body(userSubscribeService.findUserSubscribeByUser(user).stream().map(e -> new SubscribeUserResponse(e, link)));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found subscribe"));
		} catch (InsufficientFundsException exception) {
			return ResponseEntity.status(402).body(new DefaultResponse("Not successful", "Insufficient funds"));
		}

	}

	@PostMapping("/reissue_card")
	public ResponseEntity<?> reissueCard(Principal principal, @RequestBody Map<String, Long> data) {
		try {
			User user = userService.findUserByPhoneNum(principal.getName());
			Card card = user.getCards().stream().filter(e -> e.getId() == data.get("id")).findFirst().get();
			if (card.isLock()) {
				card = cardService.reissueCard(card, bankId);
				cardService.save(card);
				return ResponseEntity.ok(new CardResponse(card, link));
			}
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "The card is not blocked"));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found card"));
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

	@DeleteMapping("/card")
	public ResponseEntity<?> deleteCard(Principal principal, @RequestBody Map<String, Long> data) {
		try {
			User user = userService.findUserByPhoneNum(principal.getName());
			Card card = user.getCards().stream().filter(e -> e.getId() == data.get("id")).findFirst().get();
			if (card.isLock()) {
				user.getCards().remove(card);
				userService.save(user);
				return ResponseEntity.ok(new DefaultResponse("Successful", ""));
			}
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "The card is not blocked"));
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

	@GetMapping("/transfers")
	public Page<TransferResponse> getTransfers(Principal user, @RequestBody Map<String, Long> data,
											   @RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
											   @RequestParam(value = "limit", defaultValue = "10") @Max(50) Integer limit) {
		if (userService.findUserByPhoneNum(user.getName()).getCards().stream().filter(e -> e.getId() == data.get("id")).findFirst().orElse(null) != null)
		{
			Page<Transfer> transfers = transferService.findTopNByDateAfterOrderByDateAsc(data.get("id"), offset, limit);
			return transfers.map(e -> new TransferResponse(e));
		}
		return null;
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
