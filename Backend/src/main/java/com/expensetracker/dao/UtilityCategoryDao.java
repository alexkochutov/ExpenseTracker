package com.expensetracker.dao;

import com.expensetracker.exception.CategoryAlreadyExistsException;
import com.expensetracker.model.UtilityCategory;
import com.expensetracker.utils.ConnectionManager;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UtilityCategoryDao {

    private static final UtilityCategoryDao INSTANCE = new UtilityCategoryDao();

    private static final String QUERY_SAVE = """
            INSERT INTO utility_categories (name, description, name_translate, description_translate)
            VALUES (?, ?, ?, ?)
            """;
    private static final String QUERY_GET_BY_ID = """
            SELECT id, name, description, name_translate, description_translate
            FROM utility_categories
            WHERE id = ?
            """;
    private static final String QUERY_GET_ALL = """
            SELECT id, name, description, name_translate, description_translate
            FROM utility_categories
            """;
    private static final String QUERY_UPDATE = """
            UPDATE utility_categories
            SET name = ?,
            description = ?,
            name_translate = ?,
            description_translate = ?
            WHERE id = ?
            """;
    private static final String QUERY_DELETE = """
            DELETE FROM utility_categories
            WHERE id = ?
            """;

    private UtilityCategoryDao() {}

    public static UtilityCategoryDao getInstance() {
        return INSTANCE;
    }

    public UtilityCategory save(UtilityCategory category) {
        try (
                Connection connection = ConnectionManager.get();
                PreparedStatement preparedStatement = connection.prepareStatement(QUERY_SAVE, Statement.RETURN_GENERATED_KEYS)
        ) {
            preparedStatement.setString(1, category.getName());
            preparedStatement.setString(2, category.getDescription());
            preparedStatement.setString(3, category.getNameTranslate());
            preparedStatement.setString(4, category.getDescriptionTranslate());
            preparedStatement.executeUpdate();

            ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
            if (generatedKeys.next()) {
                category.setId(generatedKeys.getLong(1));
            }
            return category;
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate entry"))
                throw new CategoryAlreadyExistsException(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public Optional<UtilityCategory> get(long id) {
        try (
                Connection connection = ConnectionManager.get();
                PreparedStatement preparedStatement = connection.prepareStatement(QUERY_GET_BY_ID)
        ) {
            preparedStatement.setLong(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            UtilityCategory category = null;
            if (resultSet.next()) {
                category = buildCategory(resultSet);
            }
            return Optional.ofNullable(category);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<UtilityCategory> getAll() {
        try (
                Connection connection = ConnectionManager.get();
                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(QUERY_GET_ALL)
        ) {
            List<UtilityCategory> list = new ArrayList<>();
            while (resultSet.next()) {
                list.add(buildCategory(resultSet));
            }
            return list;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void update(UtilityCategory category) {
        try (
                Connection connection = ConnectionManager.get();
                PreparedStatement preparedStatement = connection.prepareStatement(QUERY_UPDATE)
                ) {
            preparedStatement.setString(1, category.getName());
            preparedStatement.setString(2, category.getDescription());
            preparedStatement.setString(3, category.getNameTranslate());
            preparedStatement.setString(4, category.getDescriptionTranslate());
            preparedStatement.setLong(5, category.getId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean delete(long id) {
        try (
                Connection connection = ConnectionManager.get();
                PreparedStatement preparedStatement = connection.prepareStatement(QUERY_DELETE)
                ) {
            preparedStatement.setLong(1, id);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private UtilityCategory buildCategory(ResultSet resultSet) throws SQLException {
        return new UtilityCategory(
                resultSet.getLong("id"),
                resultSet.getString("name"),
                resultSet.getString("description"),
                resultSet.getString("name_translate"),
                resultSet.getString("description_translate")
        );
    }
}
