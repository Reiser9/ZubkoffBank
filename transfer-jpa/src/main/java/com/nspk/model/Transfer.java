package com.nspk.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "transfers")
@Component
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name="ip")
    private String money;

    @Column(name="source_card_number")
    private String sourceCardNum;

    @Column(name="dest_card_number")
    private String destCardNum;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "id", referencedColumnName = "fk_source_bank")
//    @LazyCollection(LazyCollectionOption.FALSE)
//    private Bank sourceBank;
//
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "id", referencedColumnName = "fk_dest_bank")
//    @LazyCollection(LazyCollectionOption.FALSE)
//    private Bank destBank;

    @Column(name="status")
    private Boolean status;

    @Column(name="date")
    private Timestamp date;
}
