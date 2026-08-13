package reporter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import config.TestContext;
import enums.Tags;
import io.qameta.allure.Allure;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.Utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.TimeoutException;

public class CustomReporter implements ITestListener {

    @Override
    public void onFinish(ITestContext contextFinish) {
        System.out.println("onFinish method finished");
        List<ITestResult> allResults = new ArrayList<>();
        allResults.addAll(contextFinish.getPassedTests().getAllResults());
        allResults.addAll(contextFinish.getFailedTests().getAllResults());
        allResults.addAll(contextFinish.getSkippedTests().getAllResults());

        writeResultsToFile(allResults);

    }

    @Override
    public void onStart(ITestContext contextStart) {
        System.out.println("onStart method started");
    }

    @Override
    public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
        System.out.println("Method failed with certain success percentage" + result.getName());

    }

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("Method failed" + result.getName());
        // Auto-label flakiness
        String flakiness;
        if (result.getThrowable() instanceof TimeoutException) {
            flakiness = "timeout";
        } else {
            // dacă nu există mesaj, evităm NPE
            flakiness = inferFlakinessFromTags(result);
        }
        result.setAttribute("flakiness", flakiness);
        Allure.label("flakiness", flakiness);

        // Scrie rezultatul fail imediat
        writeResultsToFile(Collections.singletonList(result));
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("Method skipped" + result.getName());

    }

    @Override
    public void onTestStart(ITestResult result) {
        String uuid = Utils.generateUUID();
        long threadId = Thread.currentThread().getId();
        result.setAttribute("uuid", uuid);
        result.setAttribute("env", "dev");
        result.setAttribute("thread", threadId);
        result.setAttribute("tags", getTags(result));

        Allure.label("uuid", uuid);
        Allure.label("env", "dev");
        Allure.label("thread", String.valueOf(threadId));
        
        Object tagsObj = getTags(result);
        if (tagsObj instanceof String[]) {
            for (String tag : (String[]) tagsObj) {
                Allure.label("tag", tag);
            }
        }
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("Method passed" + result.getName());
        String uuid = (String) result.getAttribute("uuid");
        String env = (String) result.getAttribute("env");
        System.out.printf("Test %s ran in %s with uuid %s%n", result.getName(), env, uuid);

    }


    private Object getTags(ITestResult result) {
        return result.getMethod().getGroups();
    }


    private void writeResultsToFile(Collection<ITestResult> results) {
        List<Map<String, Object>> tests = new ArrayList<>();

        for (ITestResult r : results) {
            Map<String, Object> obj = new LinkedHashMap<>();
            obj.put("name", r.getName());
            obj.put("uuid", r.getAttribute("uuid"));
            obj.put("env", r.getAttribute("env"));
            obj.put("tags", r.getAttribute("tags"));
            obj.put("flakiness", r.getAttribute("flakiness"));
            obj.put("thread", r.getAttribute("thread"));
            obj.put("status", getStatusName(r.getStatus()));
            tests.add(obj);
        }

        String resourceDir = "target/test-status";
        String filePath = resourceDir + "/run_metadata.json";

        try {
            Files.createDirectories(Paths.get(resourceDir));
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(Paths.get(filePath).toFile(), tests);
            System.out.println("Metadata written to " + filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to write run_metadata.json", e);
        }
    }

    private String inferFlakinessFromTags(ITestResult result) {
        Object tagAttr = result.getAttribute("tags");
        if (tagAttr instanceof String[]) {
            String[] tags = (String[]) tagAttr;
            for (String tag : tags) {
                if (Tags.BUG.name().equalsIgnoreCase(tag) || Tags.DEFECT.name().equalsIgnoreCase(tag)) {
                    return "data_inconsistency";
                }
            }
        }
        return "unknown";
    }

    private String getStatusName(int status) {
        switch (status) {
            case ITestResult.SUCCESS:
                return "PASS";
            case ITestResult.FAILURE:
                return "FAIL";
            case ITestResult.SKIP:
                return "SKIPPED";
            default:
                return "UNKNOWN";
        }
    }

}
