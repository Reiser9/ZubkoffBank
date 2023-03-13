package com.example.main.controller;

import java.util.*;
import java.util.stream.Collectors;

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
import com.example.main.model.RefreshToken;
import com.example.main.model.User;
import com.example.main.payload.JwtResponse;
import com.example.main.security.jwt.JwtUtils;
import com.example.main.security.jwt.RefreshTokenService;
import com.example.main.service.impl.UserDetailsImpl;
import com.example.main.service.UserService;

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
			return ResponseEntity.badRequest().body("Incorrect credentials!");
		}
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) auth.getPrincipal();
		final String jwt = jwtUtils.generateToken(userDetailsImpl);
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetailsImpl.getId());

		return ResponseEntity.ok(new JwtResponse("Bearer", jwt, refreshToken.getRefreshToken()));
	}

	public ResponseEntity<?> createAuthenticationTokenAfterRegistration(User user) throws Exception {
		Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhoneNum(), user.getPassword()));
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) auth.getPrincipal();
		final String jwt = jwtUtils.generateToken(userDetailsImpl);
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetailsImpl.getId());
		return ResponseEntity.ok(new JwtResponse("Bearer", jwt, refreshToken.getRefreshToken()));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Map<String, String> user) throws Exception {
		User regUser = userService.findUserByPhoneNum(user.get("phoneNum"));
		if(regUser != null)
			return ResponseEntity.badRequest().body("User already exists!");
		User newUser = userService.createUser(user);
		userService.saveUser(newUser);
		return createAuthenticationTokenAfterRegistration(newUser);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser(@RequestBody Map<String, Long> userid) {
		refreshTokenService.deleteByUserId(userid.get("id"));    
	    return ResponseEntity.ok().body("User logged out");
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshtoken(@RequestBody Map<String, String> refreshToken) {
		RefreshToken token = refreshTokenService.findByRefreshToken(refreshToken.get("token"));
		if(token != null && refreshTokenService.verifyExpiration(token) != null) {
			User user = token.getUser();
			Map<String, Object> claims = new HashMap<>();
			claims.put("ROLES", user.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList()));
			String jwt = jwtUtils.createToken(claims, user.getAccountNum());
			return ResponseEntity.ok(new JwtResponse("Bearer", jwt, refreshToken.get("token")));
		}
		return ResponseEntity.badRequest().body("Refresh token expired!");
	}
	
}
