package com.example.service;

import com.example.model.Type;
import com.example.model.User;
import com.example.repository.TypeRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.http.entity.FileEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    public void saveType(String name, String path, String description, String typeName, int limit) {
        Type type = new Type();
        type.setName(name);
        type.setPath(path);
        type.setLimit(limit);
        type.setDescription(description);
        type.setType(typeName);
        typeRepository.save(type);
    }
}
