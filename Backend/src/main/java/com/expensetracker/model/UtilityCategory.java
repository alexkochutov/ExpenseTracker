package com.expensetracker.model;

import java.util.Objects;

public class UtilityCategory {

    private int id;
    private String name;
    private String description;
    private String nameTranslate;
    private String descriptionTranslate;

    public UtilityCategory() {}

    public UtilityCategory(int id, String name, String description, String nameTranslate, String descriptionTranslate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.nameTranslate = nameTranslate;
        this.descriptionTranslate = descriptionTranslate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNameTranslate() {
        return nameTranslate;
    }

    public void setNameTranslate(String nameTranslate) {
        this.nameTranslate = nameTranslate;
    }

    public String getDescriptionTranslate() {
        return descriptionTranslate;
    }

    public void setDescriptionTranslate(String descriptionTranslate) {
        this.descriptionTranslate = descriptionTranslate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UtilityCategory that = (UtilityCategory) o;
        return id == that.id && Objects.equals(name, that.name) && Objects.equals(description, that.description) && Objects.equals(nameTranslate, that.nameTranslate) && Objects.equals(descriptionTranslate, that.descriptionTranslate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, nameTranslate, descriptionTranslate);
    }

    @Override
    public String toString() {
        return "UtilityCategory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", nameTranslate='" + nameTranslate + '\'' +
                ", descriptionTranslate='" + descriptionTranslate + '\'' +
                '}';
    }

    public String toJson() {
        return "{" +
                "\"id\":" + id +
                ", \"name\":\"" + name + "\"" +
                ", \"description\":" + (description == null ? null : "\"" + description + "\"") +
                ", \"nameTranslate\":\"" + nameTranslate + "\"" +
                ", \"descriptionTranslate\":" + (descriptionTranslate == null ? null : "\"" + descriptionTranslate + "\"") +
                "}";
    }
}
