package com.example.main.service.impl;

import javax.transaction.Transactional;

import com.example.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.main.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	UserService userService;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String phoneNum) throws UsernameNotFoundException {
		User user = userService.findUserByPhoneNum(phoneNum);

		if(user == null)
			throw new UsernameNotFoundException("User Not Found");

		return UserDetailsImpl.build(user);
	}
}
