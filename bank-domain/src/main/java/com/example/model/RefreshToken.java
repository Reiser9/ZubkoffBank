package com.example.model;

import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;


@Getter
@Setter
@Entity
@Table(name = "refresh_tokens")
@Component
public class RefreshToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "token_id")
	private long id;

	@OneToOne
	@JoinColumn(name = "fk_users", referencedColumnName = "id")
	private User user;

	@Column(name = "ref_token", unique = true)
	private String refreshToken;

	@Column(name = "exp_date")
	private Instant expDate;

}
