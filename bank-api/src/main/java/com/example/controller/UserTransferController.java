package com.example.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserTransferController {
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    @GetMapping("/my-data")
//    public MyData getMyData() {
//        ResponseEntity<MyData> response = restTemplate.getForEntity(
//                "http://<IP адрес сервера с первым приложением>:<порт>/my-data",
//                MyData.class);
//        MyData myData = response.getBody();
//        myData.setAge(myData.getAge() + 5); // модификация данных
//
//        // Отправляем данные на другой сервер
//        HttpHeaders hea
//        ders = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<MyData> request = new HttpEntity<>(myData, headers);
//        restTemplate.postForObject("http://<IP адрес сервера со вторым приложением>:<порт>/my-data", request, Void.class);
//
//        return myData;
//    }
}
