package utils.file_utils;

import java.io.IOException;

public class FactoryFileLoader {
    public static Object getReader(String fileType, String env) {
        return switch (fileType.toLowerCase()) {
            case "txt" -> {
                try {
                    yield new TextFileReader().getFileType(fileType);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            case "properties" -> new PropertiesFileReader().getFileType(env);
            case "json" -> {
                try {
                    yield new JsonFileLoader().getFileType(fileType);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            case "xml" -> new XMLFileReader().getFileType(fileType);
            default -> throw new IllegalArgumentException("Unsupported type");
        };
    }
}
