package enums;

public enum EnvFilePaths {

    DEV("env/dev.properties"),
    QA("env/qa.properties");

    private final String filePath;

    EnvFilePaths(String path) {
        this.filePath = path;
    }

    public String getFilePath() {
        return filePath;
    }
}



