package com.example.service;

import com.example.model.request.CreateUserRequest;
import com.sun.istack.NotNull;
import com.example.model.response.UserResponse;

import java.util.List;

public interface UserService {
    @NotNull
    List<UserResponse> findAll();

    @NotNull
    UserResponse findById(@NotNull Integer userId);

    @NotNull
    UserResponse createUser(@NotNull CreateUserRequest request);
}
