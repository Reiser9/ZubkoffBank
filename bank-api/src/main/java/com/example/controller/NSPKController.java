package com.example.controller;

import com.example.model.DataUser;
import com.example.model.Transfer;
import com.example.model.TransferInfo;
import com.example.model.User;
import com.example.payload.DefaultResponse;
import com.example.security.JwtRequestFilter;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Null;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NSPKController {
    @Autowired
    private UserService userService;
    @Value("${bank.organization}")
    private String oraganization;
    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    @PostMapping(value = "/transfer/info", produces = APPLICATION_JSON_VALUE)
    public TransferInfo getTransferInfo(@RequestBody Map<String, String> transfer) throws Exception {
        try {
            User user = userService.findUserByPhoneNum(transfer.get("phoneNum"));
            DataUser dataUser = user.getDataUsers().get(user.getDataUsers().size()-1);
            String fullName = dataUser.getSecondName() + " " + dataUser.getFirstName();
            TransferInfo transferInfo = new TransferInfo(fullName,
                    user.getPhoneNum(), user.getCards().get(0).getCardNum(), oraganization);
            return transferInfo;
        }
        catch (NullPointerException exception) {
            return new TransferInfo();
        }
    }
}
