package com.nspk.dao;

import com.nspk.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferDAO<T extends Transfer> extends JpaRepository<T, Long> {
}
