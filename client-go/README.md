# [2023-02-10 2차 발표] 인프라 진행상항

---

## 목차

- [1. 진행사항-(1) 쿠버네티스 환경 구축](#1-진행사항---쿠버네티스-환경-구축)<br>
- [2. 진행사항-(2) 사용자 kubernetes API 접근](#2-진행사항---사용자-kubernetes-api-접근)<br>

---

## 1. 진행사항 - 쿠버네티스 환경 구축

 - 각 프로젝트(인프라/프론트엔드/백엔드)에 해당하는 **고유 IP 부여**(service를 통해 단일 진입점 제공 완료)

---

## 2. 진행사항 - 사용자 kubernetes API 접근

1. Frontend로부터 **token, host 정보(cluster 서버 주소)를 받아오는 기능** 구현 완료
<br>-> `version 1`에서 사용자의 kubernetes API정보를 얻어오기 위해 `token`, `host정보` 를 받아오는 **REST API 구성** 완료

2. 1번(Frontend)에서 입력받은 `token`과 `host 정보`를 기반으로 **사용자의 kubernetes API에 접근** 완료

3. **사용자의 pod와 policy**에 대한 yaml 파일을 가져와서 restAPI를 통해 데이터 전달 완료
<br>-> `/pod`, `/policy`를 요청 경로(endpoint)로 하여 **REST API 서버 구동** 완료 


