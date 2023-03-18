package com.example.service;

import com.example.dao.TypeDAO;
import com.example.model.Type;
import com.example.repository.TypeRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Type> findAll() {
        return typeRepository.findAll();
    }

    public Type findTypeById(int id) {
        return typeRepository.findById(id).get();
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
