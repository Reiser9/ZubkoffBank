package com.example.controller;


import com.example.model.request.CreateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.model.response.UserResponse;
import com.example.service.UserService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    //Получаем весь список пользователей
    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public List<UserResponse> findAll() {
        return userService.findAll();
    }

    //Получаем пользователя по id
    @GetMapping(value = "/{userId}", produces = APPLICATION_JSON_VALUE)
    public UserResponse findById(@PathVariable Integer userId) {
        return userService.findById(userId);
    }

    //Создаем пользователя
    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public UserResponse create(@RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }

}
