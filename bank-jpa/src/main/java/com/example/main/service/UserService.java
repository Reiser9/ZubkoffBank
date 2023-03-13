package com.example.main.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.example.main.model.DataUser;
import com.example.main.repository.RoleRepository;
import com.example.main.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.main.model.Role;
import com.example.main.model.User;

@Service
@Getter
@Setter
@AllArgsConstructor
public class UserService {
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

	public User createUser(Map<String, String> regDataUser) {
		User user = new User();
		user.setPhoneNum(regDataUser.get("phoneNum"));
		user.setPassword(regDataUser.get("password"));
		List<DataUser> dataUsers = user.getDataUsers();
		DataUser dataUser = new DataUser();
		dataUser.setFirstName(regDataUser.get("fullName").split(" ")[1]);
		dataUser.setSecondName(regDataUser.get("fullName").split(" ")[0]);
		dataUser.setMiddleName(regDataUser.get("fullName").split(" ")[2]);
		dataUsers.add(dataUser);
		user.setDataUsers(dataUsers);
		while(true) {
			String tmpAccountNum = String.valueOf((int)(1000000 + (Math.random() * (9999999 - 1000000))));
			if (findUserByAccountNum(tmpAccountNum) == null) {
				user.setAccountNum(tmpAccountNum);
				break;
			}
		}

		user.setVerify("not verified");
		return user;
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
