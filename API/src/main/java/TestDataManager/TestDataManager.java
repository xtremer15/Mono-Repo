package TestDataManager;


import io.restassured.response.Response;
import mapbox.MapboxService;
import mapbox.pojos.DatasetRequest;
import mapbox.pojos.Feature;

import java.util.concurrent.ConcurrentHashMap;

public class TestDataManager {

    private static final ConcurrentHashMap<String, Object> cache = new ConcurrentHashMap<>();



    public static void setCache(String key, Object value) {
        if (!cache.containsKey(key)) {
            cache.put(key, value);
        } else {
            throw new Error("Key " + key + " already present in cache");
        }
    }
    
    public static Object getCache(String key) {
        return cache.get(key);
    }

    public DatasetRequest getSeededDataset() {
        return DataSeeder.seedDataset();
    }
    
    public Feature getSeededFeature(String featureId) {
        return DataSeeder.seedFeature(featureId);
    }

    // --- Abstracted API Helpers --- //

    public Response createRandomDataset(String username) {
        MapboxService mapboxService = new MapboxService();
        return mapboxService.createDataset(username, getSeededDataset());
    }

    public Response createRandomFeature(String username, String datasetId, String featureId) {
        MapboxService mapboxService = new MapboxService();
        return mapboxService.createFeature(username, datasetId, featureId, getSeededFeature(featureId));
    }
}
