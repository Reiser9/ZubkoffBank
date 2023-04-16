package com.example.service;

import com.example.model.Code;
import com.example.repository.CodeRepository;
import com.example.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
@AllArgsConstructor
public class CodeService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CodeRepository codeRepository;

    public void changeStatusCode(String phoneNum, int userCode, String type) {
        Code code = codeRepository.findByUserId(userRepository.findByPhoneNum(phoneNum).getId()).stream().filter(
                e -> e.getType().equals(type) && e.getCode() == userCode).findFirst().get();
        code.setUsed(true);
        save(code);
    }

    public Code save(Code code) {
        return code = codeRepository.save(code);
    }
}
