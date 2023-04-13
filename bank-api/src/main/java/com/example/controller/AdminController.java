package com.example.controller;

import com.example.enums.UserVerify;
import com.example.model.Card;
import com.example.model.Role;
import com.example.model.Type;
import com.example.model.User;
import com.example.payload.CardResponse;
import com.example.payload.DefaultResponse;
import com.example.payload.TypeResponse;
import com.example.payload.UserResponse;
import com.example.repository.RoleRepository;
import com.example.service.CardService;
import com.example.service.TypeService;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
	@Value("${path.img}")
	private String link;
	@Autowired
	@Lazy
	private UserService userService;
	@Autowired
	@Lazy
	private CardService cardService;
	@Autowired
	@Lazy
	private TypeService typeService;
	@Autowired
	@Lazy
	private RoleRepository roleRepository;
	
	@PostMapping("/user/verify")
	public ResponseEntity<?> verified(@RequestBody Map<String, Long> data) {
		try {
			User user = userService.findById(data.get("id"));
			user.setVerify(UserVerify.THIRD_STATUS.toString());
			userService.save(user);
			return ResponseEntity.ok(user);
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@GetMapping("/users")
	public Page<UserResponse> getAll(
			@RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
			@RequestParam(value = "limit", defaultValue = "10") @Max(50) Integer limit
	) {
		Page<User> users = userService.findAll(offset, limit);
		Page<UserResponse> userResponses = users.map(UserResponse::new);
		return userResponses;
	}

	@PostMapping("/card/block")
	public ResponseEntity<?> blockCard(@RequestBody Map<String, Long> data) {
		try {
			Card card = cardService.findCardById(data.get("id"));
			card.setLock(true);
			cardService.save(card);
			return ResponseEntity.ok(card);
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@PostMapping("/user/block")
	public ResponseEntity<?> blockUser(@RequestBody Map<String, Long> data) {
		try {
			User user = userService.findById(data.get("id"));
			List<Role> roles = user.getRoles();
			if (!roles.contains(roleRepository.findByRole("blocked")))
				roles.add(roleRepository.findByRole("blocked"));
			user.setRoles(roles);
			userService.save(user);
			return ResponseEntity.ok(new UserResponse(user));
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/user/balance")
	public ResponseEntity<?> setBalance(@RequestBody Map<String, String> card_data) {
		try {
			Card card = cardService.findCardById(Long.valueOf(card_data.get("id")));
			card.setBalance(card.getBalance() + Double.parseDouble(card_data.get("balance")));
			cardService.save(card);
			return ResponseEntity.ok(new CardResponse(card));
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@PostMapping("/card/unblock")
	public ResponseEntity<?> unblockCard(@RequestBody Map<String, Long> data) {
		try {
			Card card = cardService.findCardById(data.get("id"));
			card.setLock(false);
			cardService.save(card);
			return ResponseEntity.ok(card);
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found card"));
		}
	}

	@PostMapping("/user/unblock")
	public ResponseEntity<?> unblockUser(@RequestBody Map<String, Long> data) {
		try {
			User user = userService.findById(data.get("id"));
			List<Role> roles = user.getRoles();
			Role role = roleRepository.findByRole("blocked");
			if (roles.contains(roleRepository.findByRole("blocked")))
				roles.remove(roleRepository.findByRole("blocked"));
			user.setRoles(roles);
			userService.save(user);
			return ResponseEntity.ok(new UserResponse(user));
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PostMapping("/card/type")
	public ResponseEntity<?> createTypeCard(@RequestParam("img") MultipartFile file,
											   @RequestParam("description") String description,
											   @RequestParam("name") String typeName,
											   @RequestParam("limit") String limit) throws IOException {
		String fileName = file.getOriginalFilename();
		byte[] bytes = file.getBytes();
		Path path = Paths.get("/users/app/static/img/" + fileName);
		if (Files.exists(path)) {
			return ResponseEntity.status(409).body(new DefaultResponse("Not Successful", "File already exist"));
		}
		Files.write(path, bytes);
		Type type = typeService.saveType(fileName, path.toString(), description, typeName, Integer.parseInt(limit));
		return ResponseEntity.ok(new TypeResponse(type, link));
	}

	@PostMapping("/user/role")
	public ResponseEntity<?> addRole(@RequestBody Map<String, String> data) {
		try {
			User user = userService.findById(Long.parseLong(data.get("id")));
			List<Role> roles = user.getRoles();
			Role addRole = roleRepository.findById(Integer.valueOf(data.get("roleId")));
			if (addRole == null)
				return ResponseEntity
						.status(404).body(new DefaultResponse("Not Successful", "Not found role"));
			roles.add(addRole);
			user.setRoles(roles);
			userService.save(user);
			return ResponseEntity.ok(new UserResponse(user));
		}
		catch (IllegalStateException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found role"));
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@PatchMapping("/user/role")
	public ResponseEntity<?> removeRole(@RequestBody Map<String, String> data) {
		try {
			User user = userService.findById(Long.parseLong(data.get("id")));
			List<Role> roles = user.getRoles();
			Role delRole = roleRepository.findById(Integer.valueOf(data.get("roleId")));
			if (delRole == null)
				return ResponseEntity
						.status(404).body(new DefaultResponse("Not Successful", "Not found role"));
			roles.remove(delRole);
			user.setRoles(roles);
			userService.save(user);
			return ResponseEntity.ok(new UserResponse(user));
		}
		catch (IllegalStateException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found role"));
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found user"));
		}
	}

	@GetMapping("/user/roles")
	public ResponseEntity<?> getRoles() {
		try {
			return ResponseEntity.ok(roleRepository.findAll());
		}
		catch (NullPointerException e) {
			return ResponseEntity.status(404).body(new DefaultResponse("Not Successful", "Not found roles"));
		}
	}


}
