package config;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Properties;

@Setter
@Getter
@Builder
public class Config {
    private String envURL = "";
    private String envName = "";
    private String DBConnectionString = "";
    private double portNr = 0;
    private HashMap<String, String> featureFlags = new HashMap<String, String>();
    private String logLevel = "";
    @Builder.Default
    private double timeout = 30;

    private String apiKey = "";

    public static Config resolve() throws IOException {
        // reads -Denv=qa CLI/CI, fallback dev
        String envName = System.getProperty("env", "dev");
        Properties props = loadEnv(envName);

        return Config.builder()
                .envURL(readKey(props, "BASE_URL"))
                .logLevel(readKey(props, "LOG_LEVEL"))
                .timeout(Integer.parseInt(readKey(props, "TIMEOUT")))
                .envName(readKey(props, "ENV_NAME"))
                .apiKey(readKey(props, "API_KEY").replace("\"", ""))
                .build();
    }

    private static Properties loadEnv(String envName) {
        return ConfigLoader.getInstance(envName);
    }


    private static String readKey(Properties props, String key) {
        String fromCI = System.getenv(key);
        String fromCLI = System.getProperty(key);

        if (fromCI != null && !fromCI.isBlank()) return fromCI;
        if (fromCLI != null && !fromCLI.isBlank()) return fromCLI;
        return props.getProperty(key);
    }
}
