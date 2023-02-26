package com.example.service.impl;

import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.domain.User;
import com.example.model.request.CreateUserRequest;
import com.example.model.response.UserResponse;
import com.example.repository.UserRepository;
import com.example.service.UserService;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private static UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Получаем весь список пользователей
    @NotNull
    @Override
    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::buildUserResponse)
                .collect(Collectors.toList());
    }

    //Получаем пользователя по id
    @NotNull
    @Override
    public UserResponse findById(@NotNull Integer userId) {
        return userRepository.findById(userId)
                .map(this::buildUserResponse)
                .orElseThrow(() -> new EntityNotFoundException("User " + userId + " is not found"));
    }

    //Создаем пользователя
    @NotNull
    @Override
    public UserResponse createUser(@NotNull CreateUserRequest request) {
        User user = buildUserRequest(request);
        return buildUserResponse(userRepository.save(user));
    }

    @NotNull
    private UserResponse buildUserResponse(@NotNull User user) {
        return new UserResponse()
                .setId(user.getId())
                .setPhone_num(user.getPhone_num())
                .setPassword(user.getPassword())
                .setAccount_number(user.getAccount_number());
//                .setMiddleName(user.getMiddleName())
//                .setLastName(user.getLastName())
//                .setAddress(new AddressResponse()
//                        .setCity(user.getAddress().getCity())
//                        .setBuilding(user.getAddress().getBuilding())
//                        .setStreet(user.getAddress().getStreet()));
    }

    @NotNull
    private User buildUserRequest(@NotNull CreateUserRequest request) {
        return new User()
                .setPhone_num(request.getPhone_num())
                .setPassword(request.getPassword())
                .setAccount_number(request.getAccount_number());
    }
}
