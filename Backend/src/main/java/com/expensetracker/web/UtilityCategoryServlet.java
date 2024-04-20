package com.expensetracker.web;

import com.expensetracker.service.UtilityCategoryService;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

public class UtilityCategoryServlet extends HttpServlet {

    private static final UtilityCategoryService UC_SERVICE = new UtilityCategoryService();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String payload;
        String pathInfo = request.getPathInfo();
        response.setHeader("Content-type", "application/json; charset=utf-8");
        if (Objects.isNull(pathInfo) || Objects.equals(pathInfo, "/")) {
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
                    payload = "{ \"errorMessage\" : \"Wrong ID value\" }";
                }
            } catch (NumberFormatException e) {
                response.setStatus(400);
                payload = "{ \"errorMessage\" : \"Unsupported ID format\" }";
            }
        }
        response.getWriter().write(payload);
    }
}
