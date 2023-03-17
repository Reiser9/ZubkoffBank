package com.example.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import com.example.model.Card;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.model.Role;
import com.example.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String accountNum;
	private String phoneNum;
	@JsonIgnore
	private List<Card> cards;
	private Collection<? extends GrantedAuthority> authorities;

	@JsonIgnore
	private String password;

	public UserDetailsImpl(Long id, String accountNum, String phoneNum, String password, List<Card> cards, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.accountNum = accountNum;
		this.phoneNum = phoneNum;
		this.password = password;
		this.authorities = authorities;
		this.cards = cards;
	}

	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
		
		for (Role role : user.getRoles()) {
			roles.add(new SimpleGrantedAuthority(role.getRole()));
		}

		return new UserDetailsImpl(user.getId(), user.getAccountNum(), user.getPhoneNum(), user.getPassword(), user.getCards(), roles);
	}

	public Long getId() {
		return id;
	}

	public String getAccountNum() {
		return accountNum;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return phoneNum;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

}
