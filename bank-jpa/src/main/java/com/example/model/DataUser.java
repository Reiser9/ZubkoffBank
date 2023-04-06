package com.example.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;

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

    @Column(name = "granted_date")
    private Date grantedDate;

    @Column(name = "granted")
    private String granted;

    @Column(name = "birthdate")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date birthdate;

    @Column(name = "sex")
    private Boolean sex;

    @Column(name = "fk_id_user")
    private Long userId;

    @Override
    public String toString() {
        return "DataUser{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", secondName='" + secondName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", passportNum='" + passportNum + '\'' +
                ", passportSer='" + passportSer + '\'' +
                ", address='" + granted + '\'' +
                ", birthdate=" + birthdate +
                ", sex=" + sex +
                ", userId=" + userId +
                '}';
    }
}
