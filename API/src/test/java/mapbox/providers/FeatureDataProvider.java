package mapbox.providers;

import org.testng.annotations.DataProvider;

public class FeatureDataProvider {

    @DataProvider(name = "featureNames")
    public static Object[][] getFeatureNames() {
        return new Object[][]{
            {"Standard Location", "feature-std"},
            {"Location with numbers 123", "feature-num"},
            {"Special Chars !@#$%", "feature-special"}
        };
    }
}
