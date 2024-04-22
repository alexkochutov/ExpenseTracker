package com.expensetracker.service;

import com.expensetracker.dao.UtilityCategoryDao;
import com.expensetracker.exception.CategoryAlreadyExistsException;
import com.expensetracker.model.UtilityCategory;

import java.util.List;
import java.util.Optional;

public class UtilityCategoryService {

    private static final UtilityCategoryDao UC_DAO = UtilityCategoryDao.getInstance();

    public String saveCategory(UtilityCategory category) {
        try {
            UtilityCategory result = UC_DAO.save(category);
            return "{ \"result\" : \"Category '"
                    + result.getName()
                    + "' has been successfully saved with id '"
                    + result.getId() + "'\" }";
        } catch (CategoryAlreadyExistsException e) {
            return "{ \"errorMessage\" : \"Category '"
                    + category.getName() + "' is already exist\" }";
        }
    }

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

    public String updateCategory(UtilityCategory category) {
        Optional<UtilityCategory> result = UC_DAO.get(category.getId());
        if (result.isPresent()) {
            UC_DAO.update(category);
            return "{ \"result\" : \"Category '"
                    + category.getName()
                    + "' with id "
                    + category.getId()
                    + " has been successfully updated\" }";
        } else {
            return "{ \"errorMessage\" : \"Category with id '"
                    + category.getId()
                    + "' is not found\" }";
        }
    }

    public String deleteCategory(long id) {
        Optional<UtilityCategory> result = UC_DAO.get(id);
        if (result.isPresent()) {
            if (UC_DAO.delete(id)) {
                return "{ \"result\" : \"Category '"
                        + result.get().getName()
                        + "' with id "
                        + result.get().getId()
                        + " has been successfully deleted\" }";
            } else {
                return "{ \"errorMessage\" : \"Category '"
                        + result.get().getName()
                        + "' with id "
                        + result.get().getId()
                        + " has not been deleted\" }";
            }
        } else {
            return "{ \"errorMessage\" : \"Category with id '"
                    + id + "' is not found\" }";
        }
    }
}
