package com.example.controller;

import com.example.model.Card;
import com.example.model.DataUser;
import com.example.model.User;
import com.example.payload.CardResponse;
import com.example.payload.DefaultResponse;
import com.example.payload.FullInfoUserResponse;
import com.example.payload.UserResponse;
import com.example.security.jwt.JwtRequestFilter;
import com.example.service.CardService;
import com.example.service.TypeService;
import com.example.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
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
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user phone"));
		}
	}

	@GetMapping("/info")
	public ResponseEntity<?> getFullInfoUser(Principal user) {
		User userInfo = userService.findUserByPhoneNum(user.getName());
		DataUser dataUser = userInfo.getDataUsers().get(userInfo.getDataUsers().size()-1);
		return ResponseEntity.ok(new FullInfoUserResponse(
				userInfo.getId(), userInfo.getPhoneNum(),
				userInfo.getVerify(),
				userInfo.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()),
				dataUser.getFirstName(),
				dataUser.getSecondName(),
				dataUser.getMiddleName(),
				dataUser.getPassportNum(),
				dataUser.getPassportSer(),
				dataUser.getIssued(),
				dataUser.getBirthdate(),
				dataUser.getSex()));
	}

	@PostMapping("/card/block")
	public ResponseEntity<?> setBlock(Principal user, @RequestBody Map<String, String> cardNum) {
		try {
			Card card = cardService.findCardByCardNum(cardNum.get("cardNum"));
			card.setLock(true);
			cardService.save(card);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user phone"));
		}
	}

	@PostMapping("/card")
	public ResponseEntity<?> createCard(Principal user, @RequestBody Map<String, String> dataCard) {
		if (Integer.parseInt(dataCard.get("type")) > typeService.getLength())
			return ResponseEntity.badRequest().body(
					new DefaultResponse("Not Successful", "invalid card type"));
		User userInfo = userService.findUserByPhoneNum(user.getName());
		Card newCard = cardService.createCard(dataCard, bankId);
		userInfo.getCards().add(newCard);
		userInfo.setCards(userInfo.getCards());
		userService.saveUser(userInfo);
		return ResponseEntity.ok(new CardResponse(newCard));
	}



	@PostMapping("/data")
	public ResponseEntity<?> updateDataUser(Principal user, @RequestBody Map<String, String> data) throws ParseException {
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			userService.setDataUser(userInfo, data);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		}

	}

	@PostMapping("/")
	public ResponseEntity<?> changePassword(Principal user, @RequestBody Map<String, String> pass) {
		User userByPhoneNum = userService.findUserByPhoneNum(user.getName());
		if (passwordEncoder.matches(pass.get("pass"), userByPhoneNum.getPassword())) {
			userByPhoneNum.setPassword(passwordEncoder.encode(pass.get("new_pass")));
			userService.saveUser(userByPhoneNum);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		else {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Wrong password"));
		}
	}
}
