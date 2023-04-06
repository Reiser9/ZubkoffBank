package com.example.payload;

import com.example.model.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

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
