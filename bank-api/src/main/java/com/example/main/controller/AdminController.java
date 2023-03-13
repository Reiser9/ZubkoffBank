package com.example.main.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.main.model.User;
import com.example.main.service.UserService;

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
			return ResponseEntity.ok("Уcпешный успех");
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body("Error admin 1");
		}
	}

}
