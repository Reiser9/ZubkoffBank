package com.example.controller;

import com.example.model.Card;
import com.example.model.DataUser;
import com.example.model.User;
import com.example.payload.CardResponse;
import com.example.payload.DefaultResponse;
import com.example.payload.FullInfoUserResponse;
import com.example.payload.ShortInfoUserResponse;
import com.example.security.JwtRequestFilter;
import com.example.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.text.ParseException;
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
	private RefreshTokenService refreshTokenService;
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
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user card"));
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
					userInfo.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()),
					dataUser.getFirstName()));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.ok(new DefaultResponse("Not Successful", "Not found user"));
		}

	}

	@GetMapping("/full_info")
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
				dataUser.getGranted(),
				dataUser.getBirthdate(),
				dataUser.getSex()));
	}

	@PostMapping("/card/block")
	public ResponseEntity<?> setBlock(Principal user, @RequestBody Map<String, String> cardNum) {
		try {
			Card card = cardService.findCardByCardNum(cardNum.get("cardNum"));
			card.setLock(true);
			cardService.save(card);
			return ResponseEntity.ok(card);
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@PostMapping("/card")
	public ResponseEntity<?> createCard(Principal user, @RequestBody Map<String, String> dataCard) {
		if (Integer.parseInt(dataCard.get("typeId")) > typeService.getLength())
			return ResponseEntity.badRequest().body(
					new DefaultResponse("Not Successful", "Invalid card type"));
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			Card newCard = cardService.createCard(dataCard, bankId);
			userInfo.getCards().add(newCard);
			userInfo.setCards(userInfo.getCards());
			userService.saveUser(userInfo);
			return ResponseEntity.ok(new CardResponse(newCard));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser(@RequestBody Map<String, Long> userid) {
		refreshTokenService.deleteByUserId(userid.get("id"));
		return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
	}

	@PostMapping("/data")
	public ResponseEntity<?> updateDataUser(Principal user, @RequestBody Map<String, String> data) throws ParseException {
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			DataUser dataUser = userService.setDataUser(userInfo, data);
			return ResponseEntity.ok(dataUser);
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		}
		catch (ParseException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Incorrect date format"));
		}
	}

	@PostMapping("/change_pass")
	public ResponseEntity<?> changePassword(Principal user, @RequestBody Map<String, String> pass) {
		try {
			if (pass.get("newPassword").length() < 8 && pass.get("newPassword").length() > 20) {
				User userByPhoneNum = userService.findUserByPhoneNum(user.getName());
				if (passwordEncoder.matches(pass.get("password"), userByPhoneNum.getPassword())) {
					userByPhoneNum.setPassword(passwordEncoder.encode(pass.get("newPassword")));
					userService.saveUser(userByPhoneNum);
					refreshTokenService.deleteByUserId(userService.findUserByPhoneNum(user.getName()).getId());
					return ResponseEntity.ok(new DefaultResponse("Successful", ""));
				} else {
					return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Wrong password"));
				}
			}
			else {
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Password is too short/long"));
			}
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}
}
