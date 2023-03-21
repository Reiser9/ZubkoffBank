package com.example.controller;

import com.example.model.Type;
import com.example.payload.DefaultResponse;
import com.example.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class ServerController {

    @Autowired
    private TypeService typeService;

    @GetMapping("/health")
    public ResponseEntity<?> checkHealth() {
        return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
    }

    @GetMapping("/types")
    public Page<Type> getAll(
            @RequestParam(value = "offset", defaultValue = "0") Integer offset,
            @RequestParam(value = "limit", defaultValue = "10") Integer limit
    ) {
        return typeService.findAll(offset, limit);
    }
}
