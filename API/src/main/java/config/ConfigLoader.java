package config;

import utils.file_utils.FactoryFileLoader;

import java.util.Properties;

public class ConfigLoader {

    private static volatile Properties instance;

    private ConfigLoader() {
    }

    public static Properties getInstance(String env) {
        if (instance == null) {
            synchronized (ConfigLoader.class) {
                if (instance == null) {
                    instance = (Properties) FactoryFileLoader.getReader("properties", env);

                }
            }
        }
        return instance;
    }
}
