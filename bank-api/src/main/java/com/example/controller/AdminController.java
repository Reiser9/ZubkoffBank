package com.example.controller;

import com.example.payload.DefaultResponse;
import com.example.model.User;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

	@Autowired
	@Lazy
	private UserService userService;
	
	@PostMapping("/validate")
	public ResponseEntity<?> validate(@RequestBody User user) {
		try {
			userService.saveUser(user);
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body("Error admin 1");
		}
	}

	@GetMapping("/user_info")
	public Page<User> getAll(
			@RequestParam(value = "offset", defaultValue = "0") Integer offset,
			@RequestParam(value = "limit", defaultValue = "10") Integer limit
	) {
		return userService.findAll(offset, limit);
	}

}
