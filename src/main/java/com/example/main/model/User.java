package com.example.main.model;

import java.util.List;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.stereotype.Component;


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

	@Column(name = "phone_number")
	private String phoneNum;

	@Column(name = "account_number")
	private String accountNum;

	@Column(name = "verify")
	private String verify;

	@Column(name = "password")
	private String password;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "id", foreignKey = @ForeignKey(name = "fk_role"))
	private List<Role> roles;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_id_user", referencedColumnName = "id")
	private List<Card> cards;

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", phoneNum='" + phoneNum + '\'' +
				", accountNum='" + accountNum + '\'' +
				", verify='" + verify + '\'' +
				", password='" + password + '\'' +
//				", roles=" + roles +
				", cards=" + cards +
				'}';
	}

	//	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	@JoinColumn(name = "id", foreignKey = @ForeignKey(name = "FK_data"))
//	private List<DataUser> dataUsers;
}
