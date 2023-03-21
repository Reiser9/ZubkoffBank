package com.example.controller;

import com.example.enums.UserVerify;
import com.example.model.Card;
import com.example.model.Type;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.security.JwtRequestFilter;
import com.example.service.CardService;
import com.example.service.TypeService;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
	private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
	@Autowired
	@Lazy
	private UserService userService;
	@Autowired
	@Lazy
	private CardService cardService;
	@Autowired
	@Lazy
	private TypeService typeService;
	
	@PostMapping("/user/verify")
	public ResponseEntity<DefaultResponse> verified(@RequestBody long id) {
		try {
			User user = userService.findById(id);
			user.setVerify(UserVerify.THIRD_STATUS.toString());
			userService.saveUser(user);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (NullPointerException e) {
			return ResponseEntity.ok(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@GetMapping("/users")
	public Page<User> getAll(
			@RequestParam(value = "offset", defaultValue = "0") Integer offset,
			@RequestParam(value = "limit", defaultValue = "10") Integer limit
	) {
		return userService.findAll(offset, limit);
	}

	@PostMapping("/card/block")
	public ResponseEntity<?> blockCard(@RequestBody long id) {
		try {
			cardService.setBlockCard(id);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@PostMapping("/user/block")
	public ResponseEntity<?> blockUser(@RequestBody long id) {
		try {
			userService.setBlockUser(id);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/user/money")
	public ResponseEntity<?> setMoney(@RequestBody Map<String, Long> card_data) {
		try {
			Card card = cardService.findCardById(card_data.get("id"));
			card.setBalance(card_data.get("balance"));
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@PostMapping("/card/unblock")
	public ResponseEntity<?> unblockCard(@RequestBody long id) {
		try {
			cardService.setUnblockCard(id);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@PostMapping("/user/unblock")
	public ResponseEntity<?> unblockUser(@RequestBody long id) {
		try {
			userService.setUnblockUser(id);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/type")
	public ResponseEntity<?> createTypeCard(@RequestParam("file") MultipartFile file,
											   @RequestParam("description") String description,
											   @RequestParam("name") String typeName,
											   @RequestParam("limit") String limit) throws IOException {
		String fileName = file.getOriginalFilename();
		byte[] bytes = file.getBytes();
		Path path = Paths.get("uploads/" + fileName);
		if (Files.exists(path)) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "File already exist"));
		}
		Files.write(path, bytes);
		Type type = typeService.saveType(fileName, path.toString(), description, typeName, Integer.parseInt(limit));
		return ResponseEntity.ok(type);
	}

//	@DeleteMapping(value = "/type/{id}")
//	@CrossOrigin(origins = "*")
//	public ResponseEntity<?> deleteTypeCard(@PathVariable int id) throws IOException {
//		try {
//			typeService.deleteTypeById(id);
//			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
//		}
//		catch (EmptyResultDataAccessException exception) {
//			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found type"));
//		}
//
//	}


}
