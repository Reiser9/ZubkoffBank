package com.example.main.service;

import java.util.Arrays;

import com.example.main.model.Card;
import com.example.main.repository.CardRepository;
import com.example.main.repository.TypeRepository;
import com.example.main.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.main.model.Role;
import com.example.main.model.User;
import com.example.main.repository.RoleRepository;
import com.example.main.repository.UserRepository;
import javax.transaction.Transactional;

@Service
@Getter
@Setter
@AllArgsConstructor
public class UserService {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public User findUserByPhoneNum(String phoneNum) {
		return userRepository.findByPhoneNum(phoneNum);
	}

	public User findUserByAccountNum(String accountNum) {
		return userRepository.findByAccountNum(accountNum);
	}

	public User saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role userRole = roleRepository.findByRole("user");
		user.setRoles(Arrays.asList(userRole));
        return user = userRepository.save(user);
	}
	
	public User saveAdmin(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role adminRole = roleRepository.findByRole("admin");
		user.setRoles(Arrays.asList(adminRole));
        return user = userRepository.save(user);
	}

}
