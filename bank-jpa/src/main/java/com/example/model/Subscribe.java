package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "pathFile")
    private String img;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "subscribe_id", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<UserSubscribe> userSubscribes;

    @Override
    public String toString() {
        return "Subscribe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", source=" + source +
                ", money=" + money +
                ", period=" + period +
                ", description='" + description + '\'' +
                ", img='" + img + '\'' +
                ", userSubscribes=" + userSubscribes +
                '}';
    }
}