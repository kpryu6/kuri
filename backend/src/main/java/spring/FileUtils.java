package spring;

import java.io.File;
import java.io.IOException;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

//https://jeong-pro.tistory.com/m/202
//https://homoefficio.github.io/2016/11/18/%EC%95%8C%EA%B3%A0%EB%B3%B4%EB%A9%B4-%EB%A7%8C%EB%A7%8C%ED%95%9C-Jackson-Custom-Serialization/

@SuppressWarnings({ "deprecation", "unchecked" })
public class FileUtils {
	public static ObjectMapper objectMapper = new ObjectMapper();
	
	static {
		objectMapper = JsonMapper.builder()
				.build();
		
		objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
		SimpleModule simpleModule = new SimpleModule();
		simpleModule.addDeserializer(Pod.class , new PodDeserializer());
		objectMapper.registerModule(simpleModule);
		
	}
	
	
	
	
	
	/*
	static {
      objectMapper = new ObjectMapper();
      //대소문자 구분 안하는 설정
      objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
      //pretty
      objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
      //timestamp로 저장하지 않기로 설정
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
	}
	*/
	
	public static <T> Object readJsonToObject(String fileName, Class<T> clazz) {
	      try {
	          return objectMapper.readValue(new File(fileName), clazz);
	      } catch (IOException e) {
	          //에러 처리...
	          e.printStackTrace();
	      }
	      return null;
	  }
	  
	
	  
}
