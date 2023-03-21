package com.example.service;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.example.enums.UserVerify;
import com.example.model.DataUser;
import com.example.repository.CodeRepository;
import com.example.repository.RoleRepository;
import com.example.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.model.Role;
import com.example.model.User;
import org.springframework.web.bind.annotation.RequestBody;

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

	public User findById(long id) { return userRepository.findById(id).get(); }

	public User saveUser(User user) {
		Role userRole = roleRepository.findByRole("user");
		user.setRoles(Arrays.asList(userRole));
        return user = userRepository.save(user);
	}

	public void setBlockUser(long id) {
		User user = userRepository.findById(id).get();
		List<Role> roles = user.getRoles();
		if (!roles.contains(roleRepository.findByRole("blocked")))
			roles.add(roleRepository.findByRole("blocked"));
		user.setRoles(roles);
		userRepository.save(user);
	}

	public void setUnblockUser(long id) {
		User user = userRepository.findById(id).get();
		List<Role> roles = user.getRoles();
		if (roles.contains(roleRepository.findByRole("blocked")))
			roles.remove(roleRepository.findByRole("blocked"));
		user.setRoles(roles);
		userRepository.save(user);
	}

	public void setDataUser(User user, Map<String, String> data) throws ParseException {
		List<DataUser> dataUsers = user.getDataUsers();
		DataUser dataUser = dataUsers.get(user.getDataUsers().size() - 1);
		dataUser.setBirthdate(new SimpleDateFormat("MMMM d yyyy", Locale.ENGLISH).parse(data.get("birthDate")));
		dataUser.setGranted(data.get("granted"));
		dataUser.setPassportSer(data.get("passportSer"));
		dataUser.setPassportNum(data.get("passportNum"));
		dataUser.setSex(Boolean.valueOf(data.get("sex")));
		dataUsers.set(user.getDataUsers().size() - 1, dataUser);
		user.setDataUsers(dataUsers);
		userRepository.save(user);
	}

	
	public User saveAdmin(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role adminRole = roleRepository.findByRole("admin");
		user.setRoles(Arrays.asList(adminRole));
        return user = userRepository.save(user);
	}

	public User createUser(User user, Map<String, String> regDataUser) {
		user.setPassword(passwordEncoder.encode(regDataUser.get("password")));
		user.setVerify(UserVerify.FIRST_STATUS.toString());
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

}
