package com.expensetracker.model;

import java.util.Objects;

public class UtilityCategory {

    private long id;
    private String name;
    private String description;
    private String nameTranslate;
    private String descriptionTranslate;

    public UtilityCategory() {}

    public UtilityCategory(String name, String nameTranslate) {
        this.name = name;
        this.description = null;
        this.nameTranslate = nameTranslate;
        this.descriptionTranslate = null;
    }

    public UtilityCategory(long id, String name, String description, String nameTranslate, String descriptionTranslate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.nameTranslate = nameTranslate;
        this.descriptionTranslate = descriptionTranslate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
