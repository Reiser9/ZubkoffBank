package com.example.service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.example.enums.TransferStatus;
import com.example.enums.TransferType;
import com.example.enums.UserVerify;
import com.example.model.*;
import com.example.repository.CardRepository;
import com.example.repository.CodeRepository;
import com.example.repository.RoleRepository;
import com.example.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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
	private CardRepository cardRepository;

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

	public User findById(long id) { return userRepository.findById(id).get(); }

	public User saveUser(User user) {
		Role userRole = roleRepository.findByRole("user");
		user.setRoles(Arrays.asList(userRole));
        return user = userRepository.save(user);
	}

	public User save(User user) {
		return user = userRepository.save(user);
	}

	public User setDataUser(User user, Map<String, String> data) throws ParseException {
		List<DataUser> dataUsers = user.getDataUsers();
		DataUser dataUser = dataUsers.get(user.getDataUsers().size() - 1);
		dataUser.setBirthdate(new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH).parse(data.get("birthdate")));
		dataUser.setGranted(data.get("granted"));
		dataUser.setPassportSer(data.get("passportSer"));
		dataUser.setPassportNum(data.get("passportNum"));
		dataUser.setGrantedDate(new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH).parse(data.get("grantedDate")));
		dataUser.setSex(Boolean.valueOf(data.get("sex")));
		dataUsers.set(user.getDataUsers().size() - 1, dataUser);
		user.setVerify(UserVerify.PROCESS_STATUS.toString());
		user.setDataUsers(dataUsers);
		userRepository.save(user);
		return user;
	}

	public User createUser(User user, Map<String, String> regDataUser) {
		user.setPassword(passwordEncoder.encode(regDataUser.get("password")));
		user.setVerify(UserVerify.NOT_VERIFIED_STATUS.toString());
		//Data users
		user.setDataUsers(Arrays.asList(createDataUser(regDataUser.get("fullName"))));
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

	public boolean isRegisteredUser(String phoneNum) {
		User user = userRepository.findByPhoneNum(phoneNum);
		if (user == null || user.getAccountNum() == null)
			return false;
		return true;
	}



	@Transactional
	public int deleteByPhoneNum(String phoneNum) {
		return userRepository.deleteByPhoneNum(phoneNum);
	}


}
