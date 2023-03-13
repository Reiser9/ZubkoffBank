package com.example.main.service;

import com.example.main.repository.TypeRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
@AllArgsConstructor
public class TypeService {
    @Autowired
    private TypeRepository typeRepository;

    public int getLength() { return typeRepository.findAll().size(); }
}
