package config;

public class TestContext {
    private TestContext() {}

    private static String envName;
    private static String baseUrl;
    private static String apiKey;
    private static ThreadLocal<String> datasetId = new ThreadLocal<>();

    public static String getEnvName() { return envName; }
    public static void setEnvName(String name) { envName = name; }

    public static String getBaseUrl() { return baseUrl; }
    public static void setBaseUrl(String url) { baseUrl = url; }

    public static String getApiKey() { return apiKey; }
    public static void setApiKey(String key) { apiKey = key; }

    public static String getDatasetId() { return datasetId.get(); }
    public static void setDatasetId(String id) { datasetId.set(id); }
    public static void removeDatasetId() { datasetId.remove(); }
}
