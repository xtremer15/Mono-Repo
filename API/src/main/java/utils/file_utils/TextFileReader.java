package utils.file_utils;

import interfaces.FileLoader;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class TextFileReader implements FileLoader<String> {
    @Override
    public String getFileType(String filePath) throws IOException {
        return Files.readString(Path.of(filePath));
    }
}
