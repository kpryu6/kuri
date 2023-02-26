package spring;
/*
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;

public class PodDeserializerObject {
	public static ObjectMapper customUserMapper(){
        ObjectMapper objectMapper = JsonMapper.builder()
        .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .build();
	SimpleModule module = new SimpleModule("CustomDeserializer", new Version(1, 0, 0, null, null, null));
	module.addDeserializer(User.class, new CustomDeserializer());
	objectMapper.registerModule(module);
	return objectMapper;
	}
}
*/
