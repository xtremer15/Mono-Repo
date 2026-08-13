package utils;

import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class BaseService {

    public Response get(String basePath) {
        return given()
                .spec(RequestContext.get())
                .when()
                .get(basePath)
                .then().log().all()
                .extract().response();
    }

    public Response post(Object body, String basePath) {
        return given()
                .spec(RequestContext.get())
                .body(body)
                .when()
                .post(basePath)
                .then().log().all()
                .extract().response();
    }

    public Response patch(Object body, String basePath) {
        return given()
                .spec(RequestContext.get())
                .body(body)
                .when()
                .patch(basePath)
                .then().log().all()
                .extract().response();
    }

    public Response put(Object body, String basePath) {
        return given()
                .spec(RequestContext.get())
                .body(body)
                .when()
                .put(basePath)
                .then().log().all()
                .extract().response();
    }

    public Response delete(String basePath) {
        return given()
                .spec(RequestContext.get())
                .when()
                .delete(basePath)
                .then().log().all()
                .extract().response();
    }

}
