package utils.file_utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import interfaces.FileLoader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;

public class JsonFileLoader implements FileLoader<JsonObject> {

    @Override
    public JsonObject getFileType(String filePath) throws IOException {
        InputStream rawFile = Files.newInputStream(Paths.get(filePath));
        String file = new BufferedReader(new InputStreamReader(rawFile)).lines().collect(Collectors.joining("\n"));

        return JsonParser.parseString(file).getAsJsonObject();
    }

    public JsonElement getKey(String key, String path) {
        JsonObject file;
        try {
            file = this.getFileType(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return file.get(key);
    }

}
