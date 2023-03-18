package com.example.controller;

import com.example.model.Type;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class ServerController {

    @Autowired
    private TypeService typeService;

    @PostMapping("/health")
    public ResponseEntity<?> checkHealth(@RequestBody Map<String, String> user) {
        return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
    }

    @GetMapping("/types")
    public List<Type> getTypes() {
        return typeService.findAll();
    }
}
