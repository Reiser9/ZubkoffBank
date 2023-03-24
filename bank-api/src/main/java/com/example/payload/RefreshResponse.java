package com.example.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class RefreshResponse {
	private String typeToken;
	private String accessToken;
	private String refreshToken;
}
