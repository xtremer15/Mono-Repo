package reporter;

import io.qameta.allure.Allure;
import io.restassured.filter.Filter;
import io.restassured.filter.FilterContext;
import io.restassured.response.Response;
import io.restassured.specification.FilterableRequestSpecification;
import io.restassured.specification.FilterableResponseSpecification;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;

public class CustomRestAssuredFilter implements Filter {

    @Override
    public Response filter(FilterableRequestSpecification requestSpec, FilterableResponseSpecification responseSpec, FilterContext ctx) {
        String method = requestSpec.getMethod();
        String url = requestSpec.getURI();
        
        
        String path = requestSpec.getDerivedPath();


        String accessToken = "";
        Object tokenObj = requestSpec.getQueryParams().get("access_token");
        if (tokenObj != null) {
            accessToken = tokenObj.toString();
        }

       
        String queryParams = requestSpec.getQueryParams().toString();

        String body = "";
        if (requestSpec.getBody() != null) {
            body = requestSpec.getBody().toString();
        }

       
        StringBuilder reqLog = new StringBuilder();
        reqLog.append("Method:\n").append(method).append("\n\n");
        reqLog.append("Url:\n").append(url).append("\n\n");
        reqLog.append("path:\n").append(path).append("\n\n");
        reqLog.append("access-token:\n").append(accessToken).append("\n\n");
        reqLog.append("query-params:\n").append(queryParams).append("\n\n");
        reqLog.append("Body:\n").append(body).append("\n");

        Allure.addAttachment("Custom Request: " + method, "text/plain", reqLog.toString());

        Response response = ctx.next(requestSpec, responseSpec);

        
        StringBuilder resLog = new StringBuilder();
        resLog.append("Status Code:\n").append(response.getStatusCode()).append("\n\n");
        resLog.append("Body:\n").append(response.getBody().asPrettyString()).append("\n");

        Allure.addAttachment("Custom Response: " + response.getStatusCode(), "text/plain", resLog.toString());

        StringBuilder fullLog = new StringBuilder();
        fullLog.append("=== REQUEST ===\n");
        fullLog.append("Time: ").append(LocalDateTime.now()).append("\n");
        fullLog.append(reqLog);
        fullLog.append("\n=== RESPONSE ===\n");
        fullLog.append(resLog);

        writeToFile(fullLog.toString());

        return response;
    }

    private void writeToFile(String content) {
        try {
            Files.write(Paths.get("api-requests.log"), 
                        (content + "\n---------------------------------------------------\n").getBytes(), 
                        StandardOpenOption.CREATE, 
                        StandardOpenOption.APPEND);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
