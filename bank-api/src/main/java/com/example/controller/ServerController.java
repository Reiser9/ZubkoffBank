package com.example.controller;

import com.example.model.Subscribe;
import com.example.model.Type;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.payload.SubscribeResponse;
import com.example.payload.SubscribeUserResponse;
import com.example.payload.TypeResponse;
import com.example.service.SubscribeService;
import com.example.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/")
public class ServerController {
    @Value("${path.img}")
    private String link;
    @Autowired
    private TypeService typeService;
    @Autowired
    private SubscribeService subscribeService;

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

    @GetMapping("/subscribes")
    public ResponseEntity<?> getSubscribes() {
        return ResponseEntity.ok().body(subscribeService.findSubscribes().stream().map(e -> new SubscribeResponse(e, link)));
    }
}
