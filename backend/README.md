
# 2023-02-10 2차 발표 백엔드 진행상항

---

## 1. 진행사항

### [step 1]
- `version 1`:  **프론트엔드** 로부터 전송받은 pod 분석 + policy 분석
- `version 2`:  **인프라** 로부터 전송받은 pod 분석 + policy 분석

- 전송받은 pod, policy등에 대한 정보는 **pod클래스, policy클래스** 등을 통해 객체화되며, <br> 
각 클래스의 **Dao클래스**를 통해 객체들을 관리하고 유지보수하게 됨.

<br>

### [step 2]
- 각 version에 대해 **policy**를 적용하여, 현재 모든 pod에 대해 각 **pod간 통신이 가능한가 불가능한가를 판단**하는 알고리즘 **작성 완료**


---

## 2. 알고리즘(메서드 구현)

### [ 알고리즘 진행방식 ]
- 현재 구성된 **pod들**을 PodDao 클래스의 pods (**Pod type list**)에서 관리 
- 현재 적용될 **policy들**을 PolicyList 클래스의 policyList(**Policy type list**)에서 관리 
- PolicyList의 selectPolicies 메서드에 podDao를 인자로 전달하면, 
<br><br> **->** (1️) policy의 **namespace**를 기준으로 pod들을 **파싱** 
<br> (`policy.yaml` 파일의 `metadata.namespace`를 기준으로 pod select)
<br><br> **->** (2) policy의 **label**을 기준으로 pod들을 **파싱** 
<br> (`policy.yaml` 파일의 `spec.podSelector.matchLabels`를 기준으로 pod select)
<br><br> **->** (3) polic의 **ingress, egress정책**을 통해 하나의 파드가 통신가능한 **파드**가 **연결** 
<br> (`policy.yaml` 파일의 `spec.ingress/spec.egress`를 기준으로 pod select)
<br> ( 파드 객체는 다음 파드를 필드로 가짐 )

<br>

<details>
<summary><b>network policy yaml파일 예제(클릭)</b></summary>

  ```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default # pod select 기준 1 (해당 namespace의 pod select)
spec:
  podSelector:
    matchLabels:
      role: db       # pod select 기준 2 (해당 label들을 가진 pod select)
  policyTypes:
    - Ingress
    - Egress
  ingress:           # pod select 기준 3 (해당 label들을 가진 pod select)
    - from:
        - ipBlock:
            cidr: 172.17.0.0/16
        - namespaceSelector:
            matchLabels:
              project: myproject
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 6379
  egress:            # pod select 기준 4 (해당 label들을 가진 pod select)
    - to:
        - namespaceSelector:
            matchLabels:
              project: myproject
      ports:
        - protocol: TCP
          port: 5978           
```

</details>
  


<br><br>

### [ Test 진행 ]

- policy 1

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: policy1
  namespace: namespace1
spec:
  podSelector:
    matchLabels:
      test: hi
  policyTypes:
    - Egress
  egress:
    - to:
        - podSelector:
            matchLabels:
              test: hello
```

<br>

- policy 2

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: policy2
  namespace: namespace1
spec:
  podSelector:
    matchLabels:
      test: hello
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              test2: del
```

<br>
 
- pod _(frontend, infra에서 pod 정보가 넘어오면 파싱 -> 파싱 후 pod 객체 정보를 아래에 표현)_

| name | pod1 | pod2 | pod3 | pod4 |
| --- | --- | --- | --- | --- |
| labels | `test : hi` | `test2 : del`<br>`test : hello` | `test : hello` | `test2 : del` |
| namespace | `namespace1` | `namespace1` | `namespace1` | `namespace1` |
| ip | (random 생성) | (random 생성) | (random 생성) | (random 생성) |
| port | 8080 | 80 | 53 | 20 |

<br>

- 위에서 나타난 pod, policy에 대해 알고리즘을 적용해 생성한 **그래프 정보**

<table>
  <tr>
    <td><img width="300" src="https://user-images.githubusercontent.com/68532437/217878484-18139259-35a2-4ae7-89de-20ca620860d2.png"></td>
    <td><img width="280" src="https://user-images.githubusercontent.com/68532437/217878504-4c291534-fafe-403f-a889-ebf2c8dbe964.png"></td>
  <tr>
</table>

---

## 3. 구현 예정


- 현재 쿠버네티스 클러스터 환경에서 백엔드, 프론트엔드, 인프라 간에 주고받을 정보를 공유하기 위해 **rest api** 구현 예정
- 프론트엔드/인프라에서 전송되는 pod 정보를 parsing하여 **Pod 객체로 생성**하는 과정 구현 예정






