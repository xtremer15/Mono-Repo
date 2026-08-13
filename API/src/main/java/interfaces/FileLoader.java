package interfaces;

import java.io.IOException;

public interface FileLoader<T> {
    default T getFileType(String filePath) throws IOException {
        return null;
    }

}
