package com.example.service;

import com.example.model.Type;
import com.example.model.User;
import com.example.repository.TypeRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
@AllArgsConstructor
public class TypeService {
    @Autowired
    private TypeRepository typeRepository;

    public int getLength() { return typeRepository.findAll().size(); }

    public Page<Type> findAll(int offset, int limit) {
        return typeRepository.findAll(PageRequest.of(offset, limit, Sort.by(Sort.Direction.ASC, "id")));
    }
}
