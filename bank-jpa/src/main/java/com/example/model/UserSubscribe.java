package com.example.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users_subscribe")
@Component
public class UserSubscribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subscribe_id", referencedColumnName = "id")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Subscribe subscribe;

    @Column(name = "date_subscribe")
    private Timestamp datePayment;

    @Column(name = "status")
    private boolean status;

    @Override
    public String toString() {
        return "UserSubscribe{" +
                "id=" + id +
                ", user=" + user +
                ", subscribe=" + subscribe +
                ", datePayment=" + datePayment +
                ", status=" + status +
                '}';
    }
}
