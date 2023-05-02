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
@Table(name = "types")
@Component
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "type", unique = true)
    private String type;

    @Column(name = "lim")
    private int limit;

    @Column(name = "nameFile", unique = true)
    private String name;

    @Column(name = "pathFile")
    private String img;

    @Column(name = "description", length = 1000)
    private String description;




}
