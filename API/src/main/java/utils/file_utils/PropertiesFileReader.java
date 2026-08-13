package utils.file_utils;

import config.ConfigLoader;
import interfaces.FileLoader;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesFileReader implements FileLoader<Properties> {
    @Override
    public Properties getFileType(String filePath) {
        String path = "env/" + filePath.toLowerCase() + ".properties";
        System.out.println("✅ Loading config: " + path);
        try (InputStream input = ConfigLoader.class
                .getClassLoader()
                .getResourceAsStream(path)) {

            if (input == null) {
                throw new RuntimeException("\uD83E\uDDE8 File not found: " + path);
            }

            Properties props = new Properties();
            props.load(input);
            return props;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}