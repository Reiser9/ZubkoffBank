package com.example.repository;

import com.example.dao.TypeDAO;
import com.example.model.Type;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends TypeDAO<Type> {
}
