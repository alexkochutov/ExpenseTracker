package com.expensetracker.service;

import com.expensetracker.dao.UtilityCategoryDao;
import com.expensetracker.model.UtilityCategory;

import java.util.List;
import java.util.Optional;

public class UtilityCategoryService {

    private static final UtilityCategoryDao UC_DAO = UtilityCategoryDao.getInstance();

    public String getCategoryById(long id) {
        Optional<UtilityCategory> category = UC_DAO.get(id);
        StringBuilder result = new StringBuilder();
        if (category.isPresent()) {
            result.append(category.get().toJson());
        } else {
            result.append("{ \"errorMessage\" : \"Category with id ")
                    .append(id)
                    .append(" not found\" }");
        }
        return result.toString();
    }

    public String getAllCategories() {
        List<UtilityCategory> categoryList = UC_DAO.getAll();
        StringBuilder result = new StringBuilder("{ \"utilities\" : [");
        for (int i = 0; i < categoryList.size(); i++) {
            result.append(categoryList.get(i).toJson());
            if (i < categoryList.size() - 1) {
                result.append(",");
            }
        }
        result.append("]}");
        return result.toString();
    }
}