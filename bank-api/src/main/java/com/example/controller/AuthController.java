package com.example.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.example.enums.CardType;
import com.example.service.TelegramService;
import com.example.model.RefreshToken;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.payload.RefreshResponse;
import com.example.security.JwtRequestFilter;
import com.example.security.JwtUtils;
import com.example.service.RefreshTokenService;
import com.example.service.UserService;
import com.example.service.impl.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private RefreshTokenService refreshTokenService;
	@Autowired
	private TelegramService telegramService;
	@Autowired
	private UserService userService;

	
	@PostMapping(value = "/login", produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) throws Exception {
		Authentication auth = null;
		logger.error(user.toString());
		try {
			auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhoneNum(), user.getPassword()));
		} catch (BadCredentialsException e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Incorrect credentials!"));
		}
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) auth.getPrincipal();
		final String jwt = jwtUtils.generateToken(userDetailsImpl);
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetailsImpl.getId());

		return ResponseEntity.ok(new RefreshResponse("Bearer", jwt, refreshToken.getRefreshToken()));
	}

	@PostMapping("/send_code_register")
	public ResponseEntity<?> sendCode(@RequestBody Map<String, String> phoneNumber) {
		try {
			boolean status = telegramService.sendCode(phoneNumber.get("phoneNum"), String.valueOf(CardType.REGISTER));
			if (!status)
				throw new TelegramApiException();
			return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
		}
		catch (TelegramApiException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "User did not link the account"));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Map<String, String> user) {
		try {
			if (telegramService.compareCode(user.get("phoneNum"), Integer.parseInt(user.get("code")))) {
				if (user.get("password").length() < 8 && user.get("password").length() > 20) {
					return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Password is too short/long"));
				}

				User newUser = userService.createUser(userService.findUserByPhoneNum(user.get("phoneNum")), user);

				userService.saveUser(newUser);
				return ResponseEntity.ok(new DefaultResponse("Successful", ""));
			}
			else
				return ResponseEntity.ok().body(new DefaultResponse("Not Successful", "Invalid code"));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "User did not link the account"));
		}


	}
	

	
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshtoken(@RequestBody Map<String, String> refreshToken) {
		RefreshToken token = refreshTokenService.findByRefreshToken(refreshToken.get("refreshToken"));
		if(token != null && refreshTokenService.verifyExpiration(token) != null) {
			User user = token.getUser();
			Map<String, Object> claims = new HashMap<>();
			claims.put("ROLES", user.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()));

			String jwt = jwtUtils.createToken(claims, user.getPhoneNum());
			Long id = refreshTokenService.findUserByRefreshToken(refreshToken.get("refreshToken"));
			refreshTokenService.deleteByRefreshToken(refreshToken.get("refreshToken"));
			RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(id);

			return ResponseEntity.ok(new RefreshResponse("Bearer", jwt, newRefreshToken.getRefreshToken()));
		}
		return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Refresh token expired!"));
	}
	
}
