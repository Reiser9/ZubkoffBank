package com.example.payload;

import com.example.model.DataUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataUserResponse {
    private String firstName;
    private String secondName;
    private String middleName;
    private String passportNum;
    private String passportSer;
    private Date grantedDate;
    private String granted;
    private Date birthdate;
    private Boolean sex;

    public DataUserResponse(DataUser dataUser) {
        this.firstName = dataUser.getFirstName();
        this.secondName = dataUser.getSecondName();
        this.middleName = dataUser.getMiddleName();
        this.passportNum = dataUser.getPassportNum();
        this.passportSer = dataUser.getPassportSer();
        this.grantedDate = dataUser.getGrantedDate();
        this.granted = dataUser.getGranted();
        this.birthdate = dataUser.getBirthdate();
        this.sex = dataUser.getSex();
    }
}
