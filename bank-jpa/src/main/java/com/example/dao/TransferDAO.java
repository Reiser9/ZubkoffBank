package com.example.dao;

import com.example.model.Transfer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TransferDAO<T extends Transfer> extends JpaRepository<T, Long> {
    @Query("SELECT e FROM Transfer e WHERE e.cardId = :cardId ORDER BY e.date DESC")
    Page<T> findTopNOrderByDateAsc(
            @Param("cardId") Long cardId,
            Pageable pageable);
}
