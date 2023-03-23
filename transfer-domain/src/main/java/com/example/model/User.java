package com.example.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
@Component
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name="phone_number")
    private String phoneNum;

    @Column(name="phone_number")
    private int fk_id_user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "fk_id_user")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Bank> banks;
}
