package com.example.payload;

import com.example.model.DataUser;
import com.example.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
public class FullInfoUserResponse {
    private Long id;
    private String phoneNum;
    private String verified;
    private List<String> roles;
    private String firstName;
    private String secondName;
    private String middleName;
    private String passportNum;
    private String passportSer;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date birthdate;
    private String granted;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date grantedDate;
    private Boolean sex;

    public FullInfoUserResponse(User user) {
        DataUser dataUser = user.getDataUsers().get(user.getDataUsers().size()-1);
        this.id = user.getId();
        this.phoneNum = user.getPhoneNum();
        this.verified = user.getVerify();
        this.roles = user.getRoles().stream().map(item -> item.getRole()).collect(Collectors.toList());
        this.firstName = dataUser.getFirstName();
        this.secondName = dataUser.getSecondName();
        this.middleName = dataUser.getMiddleName();
        this.passportNum = dataUser.getPassportNum();
        this.passportSer = dataUser.getPassportSer();
        this.birthdate = dataUser.getBirthdate();
        this.granted = dataUser.getGranted();
        this.grantedDate = dataUser.getGrantedDate();
        this.sex = dataUser.getSex();
    }
}