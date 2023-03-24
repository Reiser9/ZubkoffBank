package com.example.payload;

import com.example.model.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.function.Function;

@Setter
@Getter
@AllArgsConstructor
public class TypeResponse {
    private int id;

    private String name;

    private int limit;

    private String img;

    private String description;

    public TypeResponse(Type type, String link) {
        this.id = type.getId();
        this.name = type.getType();
        this.limit = type.getLimit();
        this.img = link + type.getName();
        this.description = type.getDescription();
    }
}
