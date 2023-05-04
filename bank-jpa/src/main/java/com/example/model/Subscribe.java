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
@Table(name = "subscribes")
@Component
public class Subscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "source")
    private boolean source;

    @Column(name = "money")
    private double money;

    @Column(name = "period")
    private int period;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "subscribe_id", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<UserSubscribe> userSubscribes;
}