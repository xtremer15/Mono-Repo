package mapbox.pojos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DatasetResponse {
    private String id;
    private String name;
    private String description;
    private String owner;
    private String created;
    private String modified;
}
