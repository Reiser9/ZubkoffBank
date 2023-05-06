package com.nspk.dao;

import com.nspk.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Time;
import java.sql.Timestamp;

public interface TransferDAO<T extends Transfer> extends JpaRepository<T, Long> {
    T findByDate(Timestamp date);
}
