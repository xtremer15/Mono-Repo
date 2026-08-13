package utils;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.LogDetail;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

public class RequestContext {

    private static final ThreadLocal<RequestSpecification> requestSpec = new ThreadLocal<>();

    private RequestContext() {
    }

    public static void init(String baseUri) {
        if (requestSpec.get() == null) {
            requestSpec.set(new RequestSpecBuilder()
                    .setBaseUri(baseUri)
                    .setContentType(ContentType.JSON)
                    .log(LogDetail.ALL)
                    .addFilter(new reporter.CustomRestAssuredFilter())
                    .build());
            System.out.println("✅ RequestContext initialized with baseUri: " + baseUri);
        }
    }

    public static RequestSpecification get() {
        if (requestSpec.get() == null)
            throw new IllegalStateException("❌ RequestContext not initialized. Call RequestContext.init(baseUri) first.");
        return requestSpec.get();
    }

    public static void addHeader(String key, String value) {
        requestSpec.get().header(key, value);
    }

    public static void reset() {
        requestSpec.remove();
    }

    public static void setBearer(String jwt) {
        System.out.println("Called setBearer");
        requestSpec.get().header("Authorization", "Bearer " + jwt);
    }

    public static void setQueryParam(String key, String value) {
        requestSpec.get().queryParam(key, value);
    }

    public static void setContentType(ContentType contentType) {
        requestSpec.get().contentType(contentType);
    }

    public static void setParam(String key, String value) {
        requestSpec.get().param(key, value);
    }

}