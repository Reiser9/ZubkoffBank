package com.example.controller;

import com.example.model.Card;
import com.example.model.Type;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.security.jwt.JwtRequestFilter;
import com.example.service.CardService;
import com.example.service.TypeService;
import com.example.service.UserService;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

	@PostMapping("/types")
	public ResponseEntity<String> createTypeCard(@RequestParam("file") MultipartFile file,
												 @RequestParam("description") String description,
												 @RequestParam("typeName") String typeName,
												 @RequestParam("limit") String limit) throws IOException {
		String fileName = file.getOriginalFilename();
		byte[] bytes = file.getBytes();
		Path path = Paths.get("uploads/" + fileName);
		Files.write(path, bytes);
		typeService.saveType(fileName, path.toString(), description, typeName, Integer.parseInt(limit));
		return ResponseEntity.ok("File uploaded successfully");
	}

//	@GetMapping("/types")
//	public ResponseEntity<Resource> GetTypeCards(@RequestParam("id") int id) throws IOException {
//		Type type = typeService.findTypeById(id);
//		Path path = Paths.get("uploads/" + "filename");
//		Resource resource = new UrlResource(path.toUri());
//		return ResponseEntity.ok()
//				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//				.header("type", type.getType())
//				.header("description", type.getDescription())
//				.header("limit", String.valueOf(type.getLimit()))
//				.contentType(MediaType.IMAGE_PNG)
//				.body(resource);
//	}
}
