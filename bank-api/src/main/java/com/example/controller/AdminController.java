package com.example.controller;

import com.example.model.Card;
import com.example.model.Type;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.service.CardService;
import com.example.service.TypeService;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

	@Autowired
	@Lazy
	private UserService userService;
	@Autowired
	@Lazy
	private CardService cardService;
	@Autowired
	@Lazy
	private TypeService typeService;
	
	@PostMapping("/verified")
	public ResponseEntity<DefaultResponse> verified(@RequestBody long id) {
		try {
			User user = userService.findById(id);
			user.setVerify("Verified");
			userService.saveUser(user);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
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

	@GetMapping("/types")
	public Page<Type> getTypes(
			@RequestParam(value = "offset", defaultValue = "0") Integer offset,
			@RequestParam(value = "limit", defaultValue = "10") Integer limit
	) {
		return typeService.findAll(offset, limit);
	}



}
