package spring;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonGetter;

public class Pod {

	/*-필드-*/
	private String name;
	private Map<String, String> labels = new HashMap<String, String>(); //라벨이 여러개일테니 key,value로 나타내기 위해 Map사용         //pod select 
	
	private String namespace;
	//private Namespace namespace;  일단 version 2에서는 이렇게 해도 상관 없을듯 - 현재 디렉토리의 namespace 정보도 같이 들어와야 할 듯 
	private String ip;
	private String port;
	private Map<Pod, ArrayList<Policy>> nextPods = new HashMap<Pod, ArrayList<Policy>>(); 
	private String contintainerImage; //추가 
	
	//private String containerName;
	// (추가 필요 : deployment) 하나의 deployment에서 나왔는지 확인하는 객체 
	
	
	// 한 deployment에서 나왔다면 색도 칠해줘야 함
	// 백 -> 프론트 추가 정보: 색, policy 특징, 점선/실선 
	
	/*
	private List<Policy>[] policies = new ArrayList[2]; //2차원 배열(flag, policy) //network policy 삭제를 고려 
	// -> policies[0] = FLAG.FROM(0), policies[1] = FLAG.TO(1)
	// -> policies[0][0] = this(pod)가 FLAG.FROM의 조건에 해당하는 네트워크 정책 1
	*/
	
	//private String service; - 일단 고려 x
	//private String endPoint; - 일단 고려 x
	//... 등등 필요한 필드는 추가예정
	/*-필드-*/
	
	/* -테스트용- */
	
	public boolean hasNext() {
		//만약 연결된 다음 파드가 있다면?
		if(this.nextPods != null) {
			return true;
		} else {
			return false;
		}
	}
	
	/* -테스트용- */
	
	/*-생성자-*/
	public Pod(String name, Map<String, String> labels, String nameSpace, String ip, String port, String contintainerImage) {
		super();
		this.name = name;
		this.labels = labels;
		//this.namespace = nameSpace;
		//매개변수 namespace (String) -> (Namespace)로 변경 ..  일단 string.
		this.namespace = nameSpace; 
		this.ip = ip;
		this.port = port;
		this.contintainerImage = contintainerImage;
		//this.service = service;
		//this.endPoint = endPoint;
	}
	
	public Pod() {};
	/*-생성자-*/
	
	
	/* -getter/setter- */
	@JsonGetter("nextPods")
	public Map<Pod, ArrayList<Policy>> getNextPods() {
		return this.nextPods; 
	}
	
	public void addNextPod(Pod pod, Policy policy) {
		if (!nextPods.containsKey(pod)){ //key값이 없다 -> 새로 생성 
			this.nextPods.put(pod, new ArrayList<Policy>());
		}
		this.nextPods.get(pod).add(policy);
	}
	
	@JsonGetter("name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	@JsonGetter("labels")
	public Map<String, String> getLabels() {
		return labels;
	}
	public void setLabels(Map<String, String> labels) {
		this.labels = labels;
	}
	
	
	@JsonGetter("namespace")
	public String getNamespace() {
		return namespace;
	}
	public void setNamespace(String nameSpace) { 
		this.namespace = nameSpace;
	}
	
	@JsonGetter("ip")
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	@JsonGetter("port")
	public String getPort() {
		return port;
	}
	
	public void setPort(String port) {
		this.port = port;
	}
	
	@JsonGetter("contintainerImage")
	public String getContintainerImage() {
		return contintainerImage;
	}

	public void setContintainerImage(String contintainerImage) {
		this.contintainerImage = contintainerImage;
	}
	/* -getter/setter- */
	

	
	/* -(field)policies 리스트에 값을 채우는 method 작성*/
	//Policy.java의 insertFromPods method, insertToPods에서 사용합니다
	//한 policy의 대상이 되는 pod를 찾았을 때 해당 pod에도 어떠한 policy가 쓰이는지를 적어두는 것입니다
	/*
	public void inserPolicy(Policy policy, FLAG flag) {
		this.policies[flag.ordinal()].add(policy);  //flag가 FROM이라면 policies[0]에, flag가 TO라면 policies[1]에 policy가 저장됩니다
	}
	*/
	
	

	/* -label put/remove- */
	public void putLabels(String key, String value) {
		this.labels.put(key, value);
	}
	
	public void removeLabels(String key) {
		this.labels.remove(key);
	}
	/* --- */

	@Override
	public String toString() {
		return "Pod [name=" + name + ", nextPods=" + nextPods + "]";
	}
	
	
	/*
	@Override
	public String toString() {
		return "Pod [name=" + name + ", labels=" + labels + ", namespace=" + namespace + ", ip=" + ip + ", port=" + port
				+ ", policies=" + ", nextPods=" + nextPods + "]";
	}
	*/
	
	
}

