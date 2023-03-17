package com.example.model;

import java.util.List;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.boot.jackson.JsonComponent;
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
//	@JsonIgnore
//	@JsonProperty(value = "user_password")
	private String password;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "id", foreignKey = @ForeignKey(name = "fk_role"))
	private List<Role> roles;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_id_user", referencedColumnName = "id")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<Card> cards;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_id_user", referencedColumnName = "id")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<DataUser> dataUsers;

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", phoneNum='" + phoneNum + '\'' +
				", accountNum='" + accountNum + '\'' +
				", verify='" + verify + '\'' +
				", password='" + password + '\'' +
				", roles=" + roles +
				", cards=" + cards +
				", dataUsers=" + dataUsers +
				'}';
	}
}
