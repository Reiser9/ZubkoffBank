package com.example.main.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class JwtResponse {
	private String type;
	private String access_token;
	private String refreshToken;
}
