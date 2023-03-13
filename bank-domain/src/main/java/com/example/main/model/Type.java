package com.example.main.model;

import lombok.Getter;
import lombok.Setter;
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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_id_type", referencedColumnName = "id")
    private List<Card> card;
}
