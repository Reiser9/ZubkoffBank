package com.example.main.repository;

import com.example.main.dao.TypeDAO;
import com.example.main.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends TypeDAO<Type> {
}
