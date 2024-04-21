package com.expensetracker.web;

import com.expensetracker.model.UtilityCategory;
import com.expensetracker.service.UtilityCategoryService;
import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Objects;

public class UtilityCategoryServlet extends HttpServlet {

    private static final UtilityCategoryService UC_SERVICE = new UtilityCategoryService();
    private static final String MISSING_ID_FIELD = "{ \"errorMessage\" : \"Mandatory field 'id' is not found\" }";
    private static final String MISSING_NAME_FIELD = "{ \"errorMessage\" : \"Mandatory field 'name' is not found\" }";
    private static final String WRONG_ID_VALUE = "{ \"errorMessage\" : \"Wrong ID value\" }";
    private static final String UNSUPPORTED_ID_FORMAT = "{ \"errorMessage\" : \"Unsupported ID format\" }";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        request.setCharacterEncoding("utf-8");
        response.setHeader("Content-type", "application/json; charset=utf-8");

        String payload = "";
        String pathInfo = request.getPathInfo();

        if (checkEndpoint(pathInfo)) {
            Gson gson = new Gson();
            UtilityCategory category = gson.fromJson(getRequestBody(request), UtilityCategory.class);
            if (Objects.isNull(category.getName())) {
                response.setStatus(400);
                payload = MISSING_NAME_FIELD;
            } else {
                payload = UC_SERVICE.saveCategory(category);
                if (payload.contains("errorMessage"))
                    response.setStatus(400);
                if (payload.contains("result"))
                    response.setStatus(200);
            }
        }
        response.getWriter().write(payload);
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setHeader("Content-type", "application/json; charset=utf-8");

        String payload;
        String pathInfo = request.getPathInfo();

        if (checkEndpoint(pathInfo)) {
            response.setStatus(200);
            payload = UC_SERVICE.getAllCategories();
        } else {
            String tempIdStr = pathInfo.startsWith("/") ? pathInfo.replaceFirst("/", "") : pathInfo;
            try {
                long id = Long.decode(tempIdStr);
                if (id > 0 && id < Long.MAX_VALUE) {
                    response.setStatus(200);
                    payload = UC_SERVICE.getCategoryById(id);
                } else {
                    response.setStatus(400);
                    payload = WRONG_ID_VALUE;
                }
            } catch (NumberFormatException e) {
                response.setStatus(400);
                payload = UNSUPPORTED_ID_FORMAT;
            }
        }
        response.getWriter().write(payload);
    }

    @Override
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setHeader("Content-type", "application/json; charset=utf-8");

        String payload = "";
        String pathInfo = request.getPathInfo();

        if (checkEndpoint(pathInfo)) {
            Gson gson = new Gson();
            UtilityCategory category = gson.fromJson(getRequestBody(request), UtilityCategory.class);

            if (category.getId() == 0) {
                response.setStatus(400);
                payload = MISSING_ID_FIELD;
            } else {
                if (Objects.isNull(category.getName())) {
                    response.setStatus(400);
                    payload = MISSING_NAME_FIELD;
                } else {
                    payload = UC_SERVICE.updateCategory(category);
                    if (payload.contains("errorMessage"))
                        response.setStatus(400);
                    if (payload.contains("result"))
                        response.setStatus(200);
                }
            }
        }
        response.getWriter().write(payload);
    }

    private boolean checkEndpoint(String pathInfo) {
        return Objects.isNull(pathInfo) || Objects.equals(pathInfo, "/");
    }

    private String getRequestBody(HttpServletRequest request) {
        try (BufferedReader reader = request.getReader()) {
            StringBuilder body = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                body.append(line);
            }
            return body.toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
