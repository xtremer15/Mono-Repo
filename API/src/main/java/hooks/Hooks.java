package hooks;

import config.Config;
import config.TestContext;
import org.testng.ISuite;
import org.testng.ISuiteListener;

import java.io.IOException;

public class Hooks implements ISuiteListener {
    
    @Override
    public void onStart(ISuite suite) {
        System.out.println("🚀 Suite start — resolving config...");
        try {
            Config config = Config.resolve();
            TestContext.setEnvName(config.getEnvName());
            TestContext.setBaseUrl(config.getEnvURL());
            TestContext.setApiKey(config.getApiKey());
            System.out.println("✅ Config loaded into TestContext");
        } catch (IOException e) {
            throw new RuntimeException("Failed to load config", e);
        }
    }

    @Override
    public void onFinish(ISuite suite) {
        System.out.println("✅ Suite finished");
    }
}
