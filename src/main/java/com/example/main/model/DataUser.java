package com.example.main.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "data_users")
@Component
public class DataUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "passport_number")
    private String passportNum;

    @Column(name = "passport_serial")
    private String passportSer;

    @Column(name = "address")
    private String address;

    @Column(name = "birthdate")
    private String birthdate;

    @Column(name = "sex")
    private Boolean sex;
}
