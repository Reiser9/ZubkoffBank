package com.example.payload;

import com.example.model.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Setter
@Getter
@AllArgsConstructor
public class TypeResponse {
    private static final String link = "http://51.250.104.219/images/";
    private int id;

    private String name;

    private int limit;

    private String img;

    private String description;

    public TypeResponse(Type type) {
        this.id = type.getId();
        this.name = type.getType();
        this.limit = type.getLimit();
        this.img = link + type.getName();
        this.description = type.getDescription();
    }
}
