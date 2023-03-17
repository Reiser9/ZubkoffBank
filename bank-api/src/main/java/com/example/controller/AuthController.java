package com.example.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.example.model.RefreshToken;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.payload.JwtResponse;
import com.example.security.jwt.JwtUtils;
import com.example.security.jwt.RefreshTokenService;
import com.example.service.UserService;
import com.example.service.impl.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private RefreshTokenService refreshTokenService;
	@Autowired
	private UserService userService;
	
	@PostMapping(value = "/login", produces = APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) throws Exception {
		Authentication auth = null;
		
		try {
			auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhoneNum(), user.getPassword()));
		} catch (BadCredentialsException e) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Incorrect credentials!"));
		}
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) auth.getPrincipal();
		final String jwt = jwtUtils.generateToken(userDetailsImpl);
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetailsImpl.getId());

		return ResponseEntity.ok(new JwtResponse("Bearer", jwt, refreshToken.getRefreshToken()));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Map<String, String> user) throws Exception {
		if (user.get("password").length() < 8 && user.get("password").length() > 20) {
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Password is too long"));
		}
		User regUser = userService.findUserByPhoneNum(user.get("phoneNum"));
		if(regUser != null)
			return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "User already exist"));
		User newUser = userService.createUser(user);
		userService.saveUser(newUser);
		return ResponseEntity.ok(new DefaultResponse("Successful", ""));
	}

//	@PostMapping("/code")
//	public ResponseEntity<?> sendCode(@RequestBody String numberPhone) throws Exception {
//		return userService.sendCode(numberPhone);
//	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser(@RequestBody Map<String, Long> userid) {
		refreshTokenService.deleteByUserId(userid.get("id"));    
	    return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshtoken(@RequestBody Map<String, String> refreshToken) {
		RefreshToken token = refreshTokenService.findByRefreshToken(refreshToken.get("accessToken"));
		if(token != null && refreshTokenService.verifyExpiration(token) != null) {
			User user = token.getUser();
			Map<String, Object> claims = new HashMap<>();
			claims.put("ROLES", user.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()));
			String jwt = jwtUtils.createToken(claims, user.getAccountNum());
			return ResponseEntity.ok(new JwtResponse("Bearer", jwt, refreshToken.get("accessToken")));
		}
		return ResponseEntity.badRequest().body(new DefaultResponse("Not Successful", "Refresh token expired!"));
	}
	
}
