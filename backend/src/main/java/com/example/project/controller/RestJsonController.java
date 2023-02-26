package com.example.project.controller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import spring.*;

@Controller
public class RestJsonController {

	private PodDao podDao;
	private PolicyList policyList; 
	
	public void setPodDao(PodDao podDao) {
		this.podDao = podDao;
	}
	
	@GetMapping("/members")
	public List<Map<String, Object>> findAllMember() {
		List<Map<String, Object>> members = new ArrayList<>();
		for (int i = 1; i <= 20; i++) {
			Map<String, Object> member = new HashMap<>();
			member.put("id", i);
			member.put("name", i + "번 개발자");
			member.put("age", 10 + i);
			members.add(member);
		}
		return members;
	}
	
	@GetMapping("/hello")
	public String index() { 
		System.out.println("hi~~");
		
		return "/home.html";
		//https://velog.io/@yeonnex/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8%EC%97%90%EC%84%9C-jsp-%ED%8C%8C%EC%9D%BC-%EB%A6%AC%ED%84%B4%ED%95%98%EA%B8%B0
	}
	
	
	@ResponseBody
	@PostMapping("/pod") //post: Pod들 생성 -> graph 정보 보냄 (주의: 실선 )
	//@PutMapping("/pod")
	//public ResponseEntity<Pod> Pods(@RequestBody Pod Pod) {
	public ResponseEntity<Pod> pods(@RequestBody HashMap<String, Object> map){
		ObjectMapper objectMapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addDeserializer(Pod.class, new PodDeserializer());
		objectMapper.registerModule(module);
		System.out.println("POD");
		
		//Profile profile = objectMapper.convertValue(map, Pod.class);
		Pod pod= objectMapper.convertValue(map, Pod.class);
		//userMap.put(profile.id,profile);
		//userMap.put(pod.id, pod);
		
		podDao.addPod(pod);
		//return "생성완료";
		return new ResponseEntity<Pod>(HttpStatus.OK);
		
		//https://jeong-pro.tistory.com/m/202
		//https://velog.io/@yeonnex/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8%EC%97%90%EC%84%9C-jsp-%ED%8C%8C%EC%9D%BC-%EB%A6%AC%ED%84%B4%ED%95%98%EA%B8%B0
	}
	

////////////////////////////
	/*
	@PostMapping("/pod")
	public void Pods(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
		//return null; //프론트엔드 -> 백엔드로 pod 정보 전송
		//deserialization 필요  //Jackson
	
		ServletInputStream inputStream = request.getInputStream();
	    String messageBody = StreamUtils.copyToString(inputStream,StandardCharsets.UTF_8);
		
	    
	    
	    Pod pod = objectMapper.readValue(messageBody, HelloData.class);
	     
		//@RequestBody의 Pod JSON을 파싱해서 Pod 객체로 만드는 과정 거쳐야 한다
		Pod createdPod = new Pod();
		podDao.addPod(createdPod);
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPod);
		//return ResponseEntity.status(HttpStatus.CREATED).body(createdResource);
			
	}
////////////////////////////

	@PostMapping("/policy") //policy를 보내고, graph 
	public String policy() { 
		
		
		//https://velog.io/@yeonnex/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8%EC%97%90%EC%84%9C-jsp-%ED%8C%8C%EC%9D%BC-%EB%A6%AC%ED%84%B4%ED%95%98%EA%B8%B0
	}
		
	
	/*
	//test
	@GetMapping("/hello")
	public String index() { 
		System.out.println("hi~~");
		
		return "/home.html";
		//https://velog.io/@yeonnex/%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B6%80%ED%8A%B8%EC%97%90%EC%84%9C-jsp-%ED%8C%8C%EC%9D%BC-%EB%A6%AC%ED%84%B4%ED%95%98%EA%B8%B0
	}
	*/
	
	
	/*
	//@GetMapping("/getGraphInfo")
	@GetMapping("/")
	//public Object getPodInfo(@ModelAttribute ) { //프론트엔드 -> 백엔드로 pod 정보 전송(get)
	public Object getGraphInfo() { //프론트엔드 -> 백엔드로 pod 정보 전송(get)
		//파싱 필요 
		//podDao로부터 그래프 그리는 함수 돌림 
		return podDao.getPods(); //frontend로 그래프 정보 전송(Post)ㅌ
		//이때, Serialization 필요한가 체크 (-> 필요 없을듯, 왜냐하면 그대로 보내면 되니까 PodDao의 List를)
	}
	
	
	private ObjectMapper objectMapper = new ObjectMapper();


	
	@PostMapping("/api/pod") //post: Pod들 생성 -> graph 정보 보냄 (주의: 실선 )
	//public ResponseEntity<Pod> Pods(@RequestBody Pod Pod) {
	public void Pods(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		//return null; //프론트엔드 -> 백엔드로 pod 정보 전송
		//deserialization 필요  //Jackson
	
		ServletInputStream inputStream = request.getInputStream();
	    String messageBody = StreamUtils.copyToString(inputStream,StandardCharsets.UTF_8);
		
	    
	    
	    Pod pod = objectMapper.readValue(messageBody, HelloData.class);
	     
		//@RequestBody의 Pod JSON을 파싱해서 Pod 객체로 만드는 과정 거쳐야 한다
		Pod createdPod = new Pod();
		podDao.addPod(createdPod);
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPod);
		//return ResponseEntity.status(HttpStatus.CREATED).body(createdResource);
		
	}
	
	
	@PostMapping("/api/policy") //post: Policy들 생성 -> graph 정보 보냄 (주의: 실선 )
	public Object Policies(@RequestBody Policy Policy) { //프론트엔드 -> 백엔드로 policy 정보 전송
		Policy createdPolicy = new Policy();
		policyList.insert(createdPolicy);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPolicy);
		//return ResponseEntity.status(HttpStatus.CREATED).body(createdResource);
		
	}
	
	*/
	
	/*
	//RestApi 다룰 예정
	@GetMapping("/api/.")
	public List<Pod> pods(){
		//
		return null;
	}
	
	@PostMapping("/api/.")
	public String handleObject(@RequestParam(value="넘어온 요청파라미터 값(name)", defaultValue="넘어온거 없으면 디폴트값") Boolean agree) {
		//만약 넘어온거 없으면 디폴트값을 쓰지 않고 에러를 띄오고싶으면 required=true를 주면된다.
		//그리고 그 name의 값을 변수로 agree에 넣어준다 (기본 api동작구조)
		if(!agree) {
			return "register/step1";
		}
		
		return null;
	}
	
	*/
}
