package com.example.main.service;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.example.main.model.Code;
import com.example.main.model.DataUser;
import com.example.main.repository.CodeRepository;
import com.example.main.repository.RoleRepository;
import com.example.main.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.main.model.Role;
import com.example.main.model.User;

@Service
@Getter
@Setter
@AllArgsConstructor
public class UserService {
//	@Autowired
//	@Value("${code.codeExp}")
//	private Long codeDurationMs;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private CodeRepository codeRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public User findUserByPhoneNum(String phoneNum) {
		return userRepository.findByPhoneNum(phoneNum);
	}

	public User findUserByAccountNum(String accountNum) {
		return userRepository.findByAccountNum(accountNum);
	}

	public Page<User> findAll(int offset, int limit) {
		return userRepository.findAll(PageRequest.of(offset, limit, Sort.by(Sort.Direction.ASC, "id")));
	}

//	public String sendCode(String numberPhone) {
//		return userRepository.findAll(PageRequest.of(offset, limit, Sort.by(Sort.Direction.ASC, "id")));
//	}

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

	public User createUser(Map<String, String> regDataUser) {
		User user = new User();
		user.setPhoneNum(regDataUser.get("phoneNum"));
		user.setPassword(regDataUser.get("password"));
		user.setVerify("not verified");
		//Data users
		user.setDataUsers(Arrays.asList(createDataUser(regDataUser.get("fullname"))));
		// Gen accountNum
		user.setAccountNum(generateAccountNum());
		return user;
	}

	public DataUser createDataUser(String fullname) {
		DataUser dataUser = new DataUser();
		dataUser.setFirstName(fullname.split(" ")[1]);
		dataUser.setSecondName(fullname.split(" ")[0]);
		dataUser.setMiddleName(fullname.split(" ")[2]);
		return dataUser;
	}

	public String generateAccountNum() {
		String tmpAccountNum = "";
		while(true) {
			tmpAccountNum = String.valueOf((int)(1000000 + (Math.random() * (9999999 - 1000000))));
			if (findUserByAccountNum(tmpAccountNum) == null) {
				break;
			}
		}
		return tmpAccountNum;

	}

}
