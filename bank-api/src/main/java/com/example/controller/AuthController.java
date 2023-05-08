package com.example.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.example.dto.UserAuth;
import com.example.enums.CodeType;
import com.example.model.RefreshToken;
import com.example.model.User;
import com.example.service.CodeService;
import com.example.service.TelegramService;
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
import org.springframework.security.crypto.password.PasswordEncoder;
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
	@Autowired
	private CodeService codeService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	
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
	public ResponseEntity<?> sendCode(@RequestBody Map<String, String> data) {
		try {
			if (userService.isRegisteredUser(data.get("phoneNum")))
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "The user is already registered"));
			boolean status = telegramService.sendCode(data.get("phoneNum"), String.valueOf(CodeType.REGISTER));
			if (!status)
				throw new TelegramApiException();
			return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
		}
		catch (TelegramApiException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "User did not link the account"));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/send_code_recovery")
	public ResponseEntity<?> recoveryCode(@RequestBody Map<String, String> data) {
		try {
			if (!userService.isRegisteredUser(data.get("phoneNum")))
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "This phone number was not found"));
			boolean status = telegramService.sendCode(data.get("phoneNum"), String.valueOf(CodeType.RECOVERY));
			if (!status)
				throw new TelegramApiException();
			return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
		}
		catch (TelegramApiException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "User did not link the account"));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/check_recovery_code")
	public ResponseEntity<?> recoveryPassword(@RequestBody UserAuth user) {
		if (!userService.isRegisteredUser(user.getPhoneNum()))
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		if (telegramService.compareCode(user.getPhoneNum(), user.getCode(), String.valueOf(CodeType.RECOVERY))) {
			return ResponseEntity.ok(new DefaultResponse("Successful", ""));
		}
		else
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Invalid code"));
	}

	@PostMapping("/recovery_password")
	public ResponseEntity<?> confirmRecovery(@RequestBody UserAuth user) {
		if (!userService.isRegisteredUser(user.getPhoneNum()))
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Not found user"));
		if (telegramService.compareCode(user.getPhoneNum(), user.getCode(), String.valueOf(CodeType.RECOVERY))) {
			if (user.getPassword().length() >= 8 && user.getPassword().length() <= 35) {
				User userByPhoneNum = userService.findUserByPhoneNum(user.getPhoneNum());
				userByPhoneNum.setPassword(passwordEncoder.encode(user.getPassword()));
				userService.save(userByPhoneNum);
				refreshTokenService.deleteByUserId(userByPhoneNum.getId());
				codeService.changeStatusCode(userByPhoneNum.getPhoneNum(), user.getCode(), String.valueOf(CodeType.RECOVERY));
				return ResponseEntity.ok(new DefaultResponse("Successful", ""));
			}
			else {
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Password is too short/long"));
			}
		}
		else
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Invalid code"));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserAuth user) {
		try {
			if (userService.isRegisteredUser(user.getPhoneNum()))
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "The user is already registered"));
			if (telegramService.compareCode(user.getPhoneNum(), user.getCode(), String.valueOf(CodeType.REGISTER))) {
				if (user.getPassword().length() < 8 && user.getPassword().length() > 20) {
					return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Password is too short/long"));
				}
				User newUser = userService.createUser(userService.findUserByPhoneNum(user.getPhoneNum()), user);
				userService.saveUser(newUser);
				codeService.changeStatusCode(newUser.getPhoneNum(), user.getCode(), String.valueOf(CodeType.REGISTER));
				return ResponseEntity.ok(new DefaultResponse("Successful", ""));
			}
			else
				return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Invalid code"));
		}
		catch (NullPointerException exception) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "User did not link the account"));
		}
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> refreshToken) {
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
		return ResponseEntity.status(401).body(new DefaultResponse("Not Successful", "Refresh token expired!"));
	}
	
}
