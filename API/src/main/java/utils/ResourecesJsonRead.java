package utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;

public class ResourecesJsonRead {
    private static final ObjectMapper mapper = new ObjectMapper();
    private static final JsonNode loginCredentials;

    static {
        try {
            InputStream inputStream = ResourecesJsonRead.class.getClassLoader().getResourceAsStream("login.json");
            if (inputStream == null) {
                throw new RuntimeException("login.json not found in resources");
            }
            loginCredentials = mapper.readTree(inputStream);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load login credentials", e);
        }
    }

    public static JsonNode getLoginCredentials() {
        return loginCredentials;
    }
}
