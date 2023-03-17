package com.example.controller;

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
	public ResponseEntity.BodyBuilder validate(@RequestBody User user) {
		try {
			userService.saveUser(user);
			return ResponseEntity.status(200);
		}
		catch (Exception e) {
			return ResponseEntity.status(404);
		}
	}

	@GetMapping("/users")
	public Page<User> getAll(
			@RequestParam(value = "offset", defaultValue = "0") Integer offset,
			@RequestParam(value = "limit", defaultValue = "10") Integer limit
	) {
		return userService.findAll(offset, limit);
	}

}
