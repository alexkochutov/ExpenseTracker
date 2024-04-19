package com.expensetracker.dao;

import com.expensetracker.model.UtilityCategory;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UtilityCategoryDaoTest {

    private static final UtilityCategory TEST_CATEGORY = new UtilityCategory("Test utility category", "Тестовая категория");
    private static final UtilityCategoryDao UTILITY_CATEGORY_DAO = UtilityCategoryDao.getInstance();

    @Test
    @Order(1)
    public void shouldSave() {
        UtilityCategory result = UTILITY_CATEGORY_DAO.save(TEST_CATEGORY);
        assertEquals(TEST_CATEGORY, result);
        TEST_CATEGORY.setId(result.getId());
    }

    @Test
    @Order(2)
    public void shouldGet() {
        Optional<UtilityCategory> result = UTILITY_CATEGORY_DAO.get(TEST_CATEGORY.getId());
        result.ifPresent(utilityCategory -> assertEquals(TEST_CATEGORY, utilityCategory));
    }

    @Test
    @Order(3)
    public void shouldGetAll() {
        List<UtilityCategory> resultList = UTILITY_CATEGORY_DAO.getAll();
        assertFalse(resultList.isEmpty());

        Optional<UtilityCategory> result = UTILITY_CATEGORY_DAO.get(TEST_CATEGORY.getId());
        result.ifPresent(utilityCategory -> assertTrue(resultList.contains(result.get())));
    }

    @Test
    @Order(4)
    public void shouldUpdate() {
        TEST_CATEGORY.setDescription("Test utility category's description");
        UTILITY_CATEGORY_DAO.update(TEST_CATEGORY);

        Optional<UtilityCategory> result = UTILITY_CATEGORY_DAO.get(TEST_CATEGORY.getId());
        result.ifPresent(utilityCategory -> assertEquals(TEST_CATEGORY, utilityCategory));
    }

    @Test
    @Order(5)
    public void shouldDelete() {
        assertTrue(UTILITY_CATEGORY_DAO.delete(TEST_CATEGORY.getId()));
    }
}