package com.example.dao;

import com.example.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankDAO<T extends Bank> extends JpaRepository<T, Long> {
}
