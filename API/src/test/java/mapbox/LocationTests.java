package mapbox;

import TestDataManager.TestDataManager;
import config.TestContext;
import io.restassured.response.Response;
import mapbox.pojos.Feature;
import mapbox.providers.FeatureDataProvider;
import constants.Messages;
import io.restassured.module.jsv.JsonSchemaValidator;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import utils.RequestContext;



public class LocationTests {

    private MapboxService mapboxService;
    private String username = "mihaiqtr15";
    private String apiKey;

    private TestDataManager tdm;

    @BeforeMethod
    public void setup() {
        tdm = new TestDataManager();
        apiKey = TestContext.getApiKey();

        RequestContext.reset();
        RequestContext.init(TestContext.getBaseUrl());
        RequestContext.setQueryParam("access_token", apiKey);

        mapboxService = new MapboxService();

        Response datasetResp = tdm.createRandomDataset(username);
        String createdId = datasetResp.jsonPath().getString("id");
        Assert.assertNotNull(createdId, Messages.DATASET_ID_NOT_NULL);
        TestContext.setDatasetId(createdId);
    }

    @AfterMethod
    public void teardown() {
        RequestContext.reset();
        RequestContext.init(TestContext.getBaseUrl());
        RequestContext.setQueryParam("access_token", TestContext.getApiKey());

        if (TestContext.getDatasetId() != null) {
            mapboxService.deleteDataset(username, TestContext.getDatasetId());
            TestContext.removeDatasetId();
        }
        
        RequestContext.reset(); 
    }

    @Test(description = "Verify successful feature creation in Mapbox Datasets API (200 OK)", groups = {"SMOKE", "REGRESSION"}, dataProvider = "featureNames", dataProviderClass = FeatureDataProvider.class)
    public void testCreateFeatureSuccess(String customName, String customId) {
        Feature feature = tdm.getSeededFeature(customId);
        feature.getProperties().put("name", customName);
        
        Response featureResp = mapboxService.createFeature(username, TestContext.getDatasetId(), customId, feature);
        featureResp.prettyPrint();

        Assert.assertEquals(featureResp.getStatusCode(), 200, Messages.FEATURE_CREATED_SUCCESS);
        Assert.assertEquals(featureResp.jsonPath().getString("id"), customId);
        Assert.assertEquals(featureResp.jsonPath().getString("properties.name"), customName);

        featureResp.then().assertThat().body(JsonSchemaValidator.matchesJsonSchemaInClasspath("schemas/feature-schema.json"));
    }

    @Test(description = "Verify unauthorized access without valid API Key (401 Unauthorized)", groups = {"BUG", "SMOKE"})
    public void testCreateFeatureUnauthorized() {
        RequestContext.setQueryParam("access_token", "invalid_token_123");

        Feature feature = tdm.getSeededFeature("feature-invalid");

        Response featureResp = mapboxService.createFeature(username, TestContext.getDatasetId(), "feature-invalid", feature);
        featureResp.prettyPrint();

        Assert.assertEquals(featureResp.getStatusCode(), 401, Messages.FEATURE_UNAUTHORIZED);
    }

    @Test(description = "Verify updating a feature with PUT (200 OK)", groups = {"SMOKE", "REGRESSION"})
    public void testUpdateFeatureSuccess() {
        Feature feature = tdm.getSeededFeature("feature-to-update");
        mapboxService.createFeature(username, TestContext.getDatasetId(), feature.getId(), feature);

        feature.getProperties().put("name", "Updated Location Name");
        Response updateResp = mapboxService.createFeature(username, TestContext.getDatasetId(), feature.getId(), feature);
        updateResp.prettyPrint();

        Assert.assertEquals(updateResp.getStatusCode(), 200, Messages.FEATURE_UPDATED_SUCCESS);
        Assert.assertEquals(updateResp.jsonPath().getString("properties.name"), "Updated Location Name");
    }

    @Test(description = "Verify patching a dataset metadata (200 OK)", groups = {"SMOKE", "REGRESSION"})
    public void testPatchDatasetSuccess() {
        mapbox.pojos.DatasetRequest patchReq = mapbox.pojos.DatasetRequest.builder()
                .name("Patched Dataset Name")
                .description("Patched description")
                .build();

        Response patchResp = mapboxService.patchDataset(username, TestContext.getDatasetId(), patchReq);
        patchResp.prettyPrint();

        Assert.assertEquals(patchResp.getStatusCode(), 200, Messages.DATASET_PATCHED_SUCCESS);
        Assert.assertEquals(patchResp.jsonPath().getString("name"), "Patched Dataset Name");
    }

    @Test(description = "Verify reading a feature returns 304 Not Modified when providing EntityTag", groups = {"SMOKE", "REGRESSION"})
    public void testFeatureNotModified() {
        Response createResp = tdm.createRandomFeature(username, TestContext.getDatasetId(), "feature-304");
        String etag = createResp.getHeader("ETag");
        Assert.assertNotNull(etag, Messages.ETAG_NOT_NULL);

        RequestContext.addHeader("If-None-Match", etag);

        Response getResp = mapboxService.getFeature(username, TestContext.getDatasetId(), "feature-304");
        Assert.assertEquals(getResp.getStatusCode(), 304, Messages.API_304_NOT_MODIFIED);
    }
}
