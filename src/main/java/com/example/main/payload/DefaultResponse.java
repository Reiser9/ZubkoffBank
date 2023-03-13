package com.example.main.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class DefaultResponse {
    String status;
    String error;
}
