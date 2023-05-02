package com.example.controller;

import com.example.enums.UserVerify;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
	@Value("${path.img}")
	private String link;
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
					userInfo.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()),
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
				userInfo.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()),
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
	public ResponseEntity<?> setBlock(Principal user, @RequestBody Map<String, String> cardId) {
		try {
			Card card = cardService.findCardById(Long.parseLong(cardId.get("id")));
			List<Card> cards = userService.findUserByPhoneNum(user.getName()).getCards();
			if (cards.stream().anyMatch(e -> e.getId() == Long.parseLong(cardId.get("id")))) {
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

	@PostMapping("/card")
	public ResponseEntity<?> createCard(Principal user, @RequestBody Map<String, String> dataCard) {
		if (!typeService.isExistType(Integer.parseInt(dataCard.get("typeId"))))
			return ResponseEntity.badRequest().body(
					new DefaultResponse("Not Successful", "Invalid card type"));
		try {
			User userInfo = userService.findUserByPhoneNum(user.getName());
			Card newCard = cardService.createCard(dataCard, bankId);
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
	public ResponseEntity<?> updateDataUser(Principal user, @RequestBody Map<String, String> data) throws ParseException {
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
	public ResponseEntity<?> changePassword(Principal user, @RequestBody Map<String, String> pass) {
		try {
			if (pass.get("newPassword").length() >= 8 && pass.get("newPassword").length() <= 35) {
				User userByPhoneNum = userService.findUserByPhoneNum(user.getName());
				if (passwordEncoder.matches(pass.get("password"), userByPhoneNum.getPassword())) {
					userByPhoneNum.setPassword(passwordEncoder.encode(pass.get("newPassword")));
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
	public ResponseEntity<?> deleteAccount(Principal user, @RequestBody Map<String, String> pass) {
		try {
				User userByPhoneNum = userService.findUserByPhoneNum(user.getName());
				if (passwordEncoder.matches(pass.get("password"), userByPhoneNum.getPassword())) {
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
