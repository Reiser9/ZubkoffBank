package com.example.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "phone_num")
    private String phone_num;

    @Column(name = "password")
    private String password;

    @Column(name = "account_number")
    private String account_number;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return phone_num.equals(user.phone_num) && password.equals(user.password) && account_number.equals(user.account_number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(phone_num);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", phone_num='" + phone_num + '\'' +
                ", password='" + password + '\'' +
                ", account_num='" + account_number + '\'' +
                '}';
    }
}
