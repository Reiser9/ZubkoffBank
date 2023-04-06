package com.nspk.dao;

import com.nspk.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankDAO<T extends Bank> extends JpaRepository<T, Long> {
    T findByCode(int code);
}
