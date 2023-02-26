package spring;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;


// [Jackson] objectMapper.readValue 
// json -> java class


public class PodDeserializer extends StdDeserializer {
	
	public PodDeserializer() {
		this(null);
	}
	
	protected PodDeserializer(Class vc) {
		super(vc);
		// TODO Auto-generated constructor stub
	}
	

	@Override
	public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
		
		JsonNode jsonNode = p.getCodec().readTree(p);
		
		String kind = jsonNode.get("kind").asText();
		//일단 type = pod만 처리한다고 생각 *************
		
		/*
		boolean deployment = false;
		if (kind.equalsIgnoreCase("Deployment")) { //대소구분없이 비교
			  //replicaset 존재, 처리  로직 생성
			 //String jsonpathCreatorNamePath = "$['spec']['replicas']";
			 //DocumentContext jsonContext = JsonPath.parse(jsonDataSourceString);
			 //String jsonpathCreatorName = jsonContext.read(jsonpathCreatorNamePath);
			 deployment = true;
		}
		*/
		
		JsonNode metadataNode = jsonNode.get("metadata");
		String name = metadataNode.get("name").asText(); // (1) pod name
		//[예외처리] name이 없다 -> error처리 
		String namespace;
		if(metadataNode.has("namespace")) {
			if (metadataNode.get("namespace") != null) {
				namespace = metadataNode.get("namespace").asText(); //(2) namespace
			}
			else {
				namespace = "default"; // or 설정 x //(2) namespace
			}
		}
		
		Map<String, String> labels = new HashMap<>(); //(3) labels
		
		if(metadataNode.has("labels")) {
			if (metadataNode.get("labels") != null) {
				JsonNode labelsNode = metadataNode.get("labels");
				
		        Iterator<Map.Entry<String, JsonNode>> fieldsIterator = labelsNode.fields();
		        while (fieldsIterator.hasNext()) {
		            Map.Entry<String, JsonNode> field = fieldsIterator.next();
		            labels.put(field.getKey(), field.getValue().asText());
		        }
			}
		}
		
		
		JsonNode specNode = jsonNode.get("spec"); //[예외처리] spec이 없다 -> error처리
		JsonNode containersNode = specNode.get("containers"); //[예외처리] container이 없다 -> error처리
		
		//String containerName = containersNode.get("name").asText(); //(4)containerName
		String image;
		if(containersNode.has("image")) {
			if (containersNode.get("image") != null) {
				image = containersNode.get("image").asText(); //(5) image
			}
			else {
				image = "default"; // or 설정 x 
			}
		}
		
		JsonNode portsNode = null;
		if(containersNode.has("ports")) { //JsonNode portsNode = containersNode.get("ports");
			if (containersNode.get("ports") != null) {
				portsNode = containersNode.get("ports");
			}
		}
		
		String containerPort; 
		String hostIP;
		
		if (portsNode != null) { //String containerPort = portsNode.get("containerPort").asText(); // (6) container port
			if(portsNode.has("containerPort")) {
				if (containersNode.get("ports") != null) {
					containerPort = portsNode.get("containerPort").asText(); // (6) container port
				}
			}
			if(portsNode.has("hostIP")) { //hostIP = portsNode.get("hostIP").asText(); // (7) IP
				if (portsNode.get("hostIP") != null) {
					containerPort = portsNode.get("containerPort").asText(); // (6) container port	
			}
		}
			
		
		
		/*
		if ((deployment == true) && (!spec.get("replicas").isNull())){
			String replicas = spec.get("replicas").asText();
		}
		*/
		//public Pod(String name, Map<String, String> labels, Namespace nameSpace, String ip, String port, String contintainerImage) {
		return new Pod(name, labels, namespace, hostIP, containerPort, image);
		
		//String name = jsonNode.get("name").asLong();
		/*
		JsonNode spec = jsonNode.get("spec");
		spec.get("replicas");
		*/
		   
		
      
		//return null;
	}

	/*
	@JsonCreator
	public void CreatePod(@JsonProperty("name") String name) {
		this.name = name;
	}
	*/
}








/*
public class JsonStringToObject {
	ObjectMapper mapper = new ObjectMapper()
			.registerModule(new JavaTimeModule())
			.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
		.configure(DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE,false);
}
*/