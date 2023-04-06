package com.example.controller;

import com.example.model.Type;
import com.example.payload.DefaultResponse;
import com.example.payload.TypeResponse;
import com.example.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@RestController
@RequestMapping("/")
public class ServerController {
    @Value("${path.img}")
    private String link;
    @Autowired
    private TypeService typeService;

    @GetMapping("/health")
    public ResponseEntity<?> checkHealth() {
        return ResponseEntity.ok().body(new DefaultResponse("Successful", ""));
    }

    @GetMapping("/card/types")
    public Page<TypeResponse> getAll(
            @RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
            @RequestParam(value = "limit", defaultValue = "10") @Max(50) Integer limit
    ) {
        Page<Type> types = typeService.findAll(offset, limit);
        return types.map(type -> new TypeResponse(type, link));
    }
}
