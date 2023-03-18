package com.example.controller;

import com.example.model.User;
import com.example.payload.DefaultResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/")
public class ServerController {

    @PostMapping("/health")
    public ResponseEntity<?> checkHealth(@RequestBody Map<String, String> user) {
        return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
    }
}
