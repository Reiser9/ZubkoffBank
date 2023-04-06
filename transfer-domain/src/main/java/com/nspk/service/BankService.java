package com.nspk.service;

import com.nspk.model.Bank;
import com.nspk.repository.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankService {
    @Autowired
    private BankRepository bankRepository;

    public Bank findBankByCode(int code) {
        return bankRepository.findByCode(code);
    }

    public void createBank(int code) {
        Bank bank = new Bank();
        bank.setCode(code);
        bankRepository.save(bank);
    }
}
