package com.example.dao;

import com.example.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferDAO<T extends Transfer> extends JpaRepository<T, Long> {
}
