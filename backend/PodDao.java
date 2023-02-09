package com.example.demo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PodDao {
	private List<Pod> pods = new ArrayList<>();

	public List<Pod> getPods() {
		return pods;
	}

	public void setPods(List<Pod> pods) { //(규민) 추가 - PolicyList.java에서 사용됩니다만, 옳지 못한 구조라면 바꾸겠습니다
		this.pods = pods;
	}
	
	public List<Pod> selectByLabel(Map<String, String> labels, List<Pod> pods) {

		if (labels == null) {
			return null;
		}

		Map<String, String> podMap;  
		boolean flag = false;
		
		List<Pod> returnList = new ArrayList<Pod>();
		
		// 1:1 or 1 : n 허용(매개변수(policy) label: (pod의)label)
		
		for (Pod pod : pods) { //각각의 pod에 대해 검증 label 검증 
			//key값이 없는데, 특정 key값을 통해 값을 조회하려 하면 null을 반환합니다
			podMap = pod.getLabels();
			if (podMap == null) {
				continue;
			}
			
			for (Map.Entry<String, String> polocyLabel : labels.entrySet()) {
	
				if(!podMap.containsKey(polocyLabel.getKey()) || !podMap.get(polocyLabel.getKey()).equals(polocyLabel.getValue())){
					flag = false;
					break;
				}else {
					flag = true;
				}
			}
			if(flag == true) { //해당 pod는 이 label에 일치 (or 포함)
				returnList.add(pod);
			}
		}
		
		if(returnList.isEmpty()) {
			return null; 
		}
		return returnList;
	}
	

	public List<Pod> selectByLabel(Map<String, String> labels) {
		return selectByLabel(labels, this.pods);
	}
	
	
	
	public List<Pod> selectByNamespace(String namespace, List<Pod> pods) {
		//namespace을 매개변수로 주었을때 pod들중 해당되는 pod 리턴
		List<Pod> returnList = new ArrayList<Pod>();
		
		for (Pod pod : pods) {
			if(namespace.equals(pod.getNamespace().getName())) {
				returnList.add(pod);
			}
		}
		if(returnList.isEmpty()) {
			return null;
		}
		return returnList;
	}
	
	public List<Pod> selectByNamespace(String namespace) {
		return selectByNamespace(namespace, this.pods);
	}
		
	
	
	/*select by port 사용 여부 고려중(port는 정말 pod select 기준이 맞는가?)*/
	public List<Pod> selectByPort(String port, List<Pod> pods) { 
		//port번호를 매개변수로 주었을때 pod들중 해당되는 pod 리턴
		List<Pod> returnList = new ArrayList<Pod>();
		for (Pod pod : pods) {
			if(pod.getPort().equals(port)) {
				returnList.add(pod);
			}
		}
		if(returnList.isEmpty()) {
			return null; 
		}
		return returnList;
	}
	
	
	public List<Pod> selectByIp(Cidr cidr, List<Pod> pods) {
		//port번호를 매개변수로 주었을때 pod들중 해당되는 pod 리턴
		List<Pod> returnList = new ArrayList<Pod>();
		for (Pod pod : pods) {
			if(cidr.match(pod.getIp())) { // ip block 안으로 포함(match)된 경우에만 
				returnList.add(pod);
			}
		}
		if(returnList.isEmpty()) {
			return null; 
		}
		return returnList;
	}
	
	
	public List<Pod> selectByEgressIngress(IngressEgressPolicy egressIngress, List<Pod> pods) {
		
		List<Pod> returnList = pods;
		List<Pod> middleList = pods;
	
		//if (egressIngress.getNamespaceSelectorLabel() != null) {
		middleList = selectByLabel(egressIngress.getNamespaceSelectorLabel(), returnList);	
		
		if (middleList != null) {
			 returnList = new ArrayList<Pod>(middleList);
		}
		
		//-----------------------------------------------------------------	
			
		middleList = selectByLabel(egressIngress.getPodSelectorLabel(), returnList);
		if (middleList != null) {
			 returnList = new ArrayList<Pod>(middleList);
		}
		//-----------------------------------------------------------------
//		middleList = selectByIp(egressIngress.getIpBlock(), returnList); //ip블록은 일단 제친다 - 구현하더다도 이 class의 selectByIpBlock 메소드부터 구현해야 함
//		
//		if (middleList != null) {
//			 returnList = new ArrayList<Pod>(middleList);
//		}
		//-----------------------------------------------------------------
		middleList = selectByPort(egressIngress.getPort(), returnList);
		
		if (middleList != null) {
			 return middleList;
		}
		else {
			return returnList;
		}
	}
	
	public List<Pod> selectByEgressIngress(IngressEgressPolicy egressIngress) { //사용을 권항하지 않습니다. 이 egress 조건에 의한 pod select는 맨 마지막에 사용되기 때문입니다
		return selectByEgressIngress(egressIngress, this.pods);
	}
	
	
	//파드 다오의 파드리스트를 돌면서 연결되어있는 파드들을 연결 리스트로 만들기
	public List<Pod> checkPods = new ArrayList<>();
	//메서드 내에서 checkPod 쓴뒤에 꼭 null로 마지막에 초기화 시켜주기
	public void podCheck(Pod pod){
		
		//System.out.println("현재 파드는 " + pod.getName());
		this.checkPods.add(pod);
		//System.out.println("여기까지옴");
		
		if(pod.hasNext()) {
			for(Pod podChild : pod.getNextPods()) {
				if(podChild.getName() == pod.getName()) {
					pod.getNextPods().remove(podChild);
				}
			}
			for(Pod podChild : pod.getNextPods()) {
				podCheck( podChild);
			}
		}
	}
	
	public void podListCheck() {
		int count = 0;
		for(Pod pod : this.pods) {
			count++;
			//System.out.println("뿌리파드!! :"+count);
			podCheck(pod); //이 메서드 이후에 checkPods 리스트에는 현재 pod에 간접연결된 모든 파드들이 포함됨.
			//폴리시 검증
			/*
			 * System.out.println("뿌리파드와 연결(간접 + 직접)되어있는 모든 파드들 출력");
			 * System.out.println("현재의 뿌리파드는 :" + pod );
			 * System.out.println("===========================");
			 */
			
			//그렇다면 현재 파드와 연결된 모든 파드의 폴리시를 다시 검증해야함.
			//우선 현재 pod를 podlist에서 제거하기
			this.checkPods.remove(pod);
			//이후 현재파드와 리스트에있는 파드 하나씩 돌면서 검증하기.
			
			
			
			/*
			 * for(Pod pod2 : this.checkPods) { System.out.println(pod2); //1 -> 2 -> 3 의 1
			 * -> 3 간접 연결됨. 1 -> 3 의 폴리시를 한 번 더 검증하는 과정
			 * 
			 * }
			 */
			//검증후 리스트 비우기
			
			this.checkPods  = new ArrayList<>();
		}
	}
	
}
