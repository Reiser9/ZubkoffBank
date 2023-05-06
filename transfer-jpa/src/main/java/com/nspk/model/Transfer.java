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

    @Column(name="money")
    private String money;

    @Column(name="source_card_num")
    private String sourceCardNum;

    @Column(name="dest_phone_num")
    private String destPhoneNum;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "fk_id_SBank", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Bank sourceBank;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "fk_id_DBank", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Bank destBank;

    @Column(name="status")
    private Boolean status;

    @Column(name="date")
    private Timestamp date;
}
