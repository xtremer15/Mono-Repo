package mapbox;

import config.Routes;
import io.restassured.response.Response;
import mapbox.pojos.DatasetRequest;
import mapbox.pojos.Feature;
import utils.BaseService;

public class MapboxService extends BaseService {
    
    public Response createDataset(String username, DatasetRequest request) {
        return post(request, Routes.datasets + "/" + username);
    }
    
    public Response patchDataset(String username, String datasetId, DatasetRequest request) {
        return patch(request, Routes.datasets + "/" + username + "/" + datasetId);
    }
    
    public Response getDataset(String username, String datasetId) {
        return get(Routes.datasets + "/" + username + "/" + datasetId);
    }
    
    public Response deleteDataset(String username, String datasetId) {
        return delete(Routes.datasets + "/" + username + "/" + datasetId);
    }
    
    public Response createFeature(String username, String datasetId, String featureId, Feature feature) {
        return put(feature, Routes.datasets + "/" + username + "/" + datasetId + "/features/" + featureId);
    }
    
    public Response getFeature(String username, String datasetId, String featureId) {
        return get(Routes.datasets + "/" + username + "/" + datasetId + "/features/" + featureId);
    }
    
    public Response deleteFeature(String username, String datasetId, String featureId) {
        return delete(Routes.datasets + "/" + username + "/" + datasetId + "/features/" + featureId);
    }
}
