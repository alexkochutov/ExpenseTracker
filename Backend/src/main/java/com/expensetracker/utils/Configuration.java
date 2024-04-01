package com.expensetracker.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public final class Configuration {

    private static final Properties CONFIG = new Properties();

    static {
        readProperties();
    }

    private Configuration() {}

    public static String get(String key) {
        return CONFIG.getProperty(key);
    }

    private static void readProperties() {
        try (InputStream inputStream = Configuration.class.getClassLoader().getResourceAsStream("application.properties")) {
            CONFIG.load(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
