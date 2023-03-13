package com.example.main.controller;

import com.example.main.model.Card;
import com.example.main.model.User;
import com.example.main.payload.CardResponse;
import com.example.main.payload.DefaultResponse;
import com.example.main.payload.UserResponse;
import com.example.main.security.jwt.JwtUtils;
import com.example.main.service.CardService;
import com.example.main.service.TypeService;
import com.example.main.service.UserService;
import com.sun.istack.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	@Value("${bank.id}")
	private String bankId;
	@Autowired
	private UserService userService;
	@Autowired
	private TypeService typeService;
	@Autowired
	private CardService cardService;
	@Autowired
	private PasswordEncoder passwordEncoder;


	@GetMapping("/card")
	public ResponseEntity<?> findCardByUser(Principal user) {
		try {
			return ResponseEntity.ok(cardService.findCardByUserId(userService.findUserByPhoneNum(user.getName()).getId()));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body("Error 1");
		}
	}

	@GetMapping("/1")
	public ResponseEntity<?> GetFullInfoUser(Principal user) {
//		try {
		User userInfo = userService.findUserByPhoneNum(user.getName());
//		logger.error(userInfo.toString());
		return ResponseEntity.ok(new UserResponse(
				userInfo.getId(), userInfo.getPhoneNum(),
				userInfo.getVerify(),
				userInfo.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()),
				userInfo.getDataUsers().get(userInfo.getDataUsers().size()-1).getFirstName()));
//		}
//		catch (Exception e) {
//			return ResponseEntity.badRequest().body(e.getStackTrace());
//		}
	}

	@PostMapping("/block")
	public ResponseEntity<?> block(Principal user, @RequestBody Map<String, String> cardNum) {
		try {
			Card card = cardService.findCardByCardNum(cardNum.get("cardNum"));
			card.setLock(true);
			cardService.save(card);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getStackTrace());
		}
	}

	@PostMapping("/unblock")
	public ResponseEntity<?> unblock(Principal user, @RequestBody Map<String, String> cardNum) {
		Card card = cardService.findCardByCardNum(cardNum.get("cardNum"));
		card.setLock(false);
		cardService.save(card);
		return ResponseEntity.ok(new DefaultResponse("Successful", ""));
	}

	@PostMapping("/create_card")
	public ResponseEntity<?> createCard(Principal user, @RequestBody Map<String, String> data_card) {
		if (Integer.parseInt(data_card.get("type")) > typeService.getLength())
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "invalid card type"));
		User tmpUser = userService.findUserByPhoneNum(user.getName());
		List<Card> cards = cardService.findCardByUserId(tmpUser.getId());
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(new Timestamp(System.currentTimeMillis()).getTime());
		cal.add(Calendar.YEAR, 4);
		Timestamp date = new Timestamp(cal.getTime().getTime());
		String cardNum = "";
		while(true) {
			cardNum = bankId
					+ String.valueOf((int)(1000 + (Math.random() * (9999 - 1000))))
					+ String.valueOf((int)(1000 + (Math.random() * (9999 - 1000))))
					+ String.valueOf((int)(1000 + (Math.random() * (9999 - 1000))));
			if (cardService.findCardByCardNum(cardNum) == null)
				break;
		}
		Card card = new Card();
		card.setCardNum(cardNum);
		card.setCvc(String.valueOf((int)(100 + (Math.random() * (999 - 100)))));
		card.setExpDate(date);
		card.setMoney(0);
		card.setFirstName(data_card.get("firstName"));
		card.setSecondName(data_card.get("secondName"));
		card.setUserId(tmpUser.getId());
		card.setLock(false);
		card.setTypeId(Integer.parseInt(data_card.get("type")));
		cards.add(card);
		tmpUser.setCards(cards);
		cardService.save(cards.get(cards.size()-1));
		userService.saveUser(tmpUser);
		return ResponseEntity.ok(new CardResponse(cards.get(cards.size()-1)));
	}

	@PostMapping("/change_pass")
	public ResponseEntity<?> changePassword(Principal user, @RequestBody Map<String, String> pass) {
		User userByPhoneNum = userService.findUserByPhoneNum(user.getName());
		if (passwordEncoder.matches(pass.get("pass"), userByPhoneNum.getPassword())) {
			userByPhoneNum.setPassword(passwordEncoder.encode(pass.get("new_pass")));
			userService.saveUser(userByPhoneNum);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		else {
			return ResponseEntity.badRequest().body("Incorrect credentials!");
		}
	}
}
