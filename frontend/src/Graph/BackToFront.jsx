import { useEffect, useState } from "react";
//import BackToFront2JSON from "./BackToFront2JSON.json";
//import BackToFront3JSON from "./BackToFront3JSON.json";
import NetworkGraph from "./NetworkGraph";
import Cookies from "js-cookie";

const fetchData = () => {
  // 데이터를 가져오는 비동기 작업 수행

  //return fetch("/login", {
  return fetch("http://localhost:8081/pods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: Cookies.get("token"),
      host: Cookies.get("host"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Parsed Data:", data);
      return data;
    });
};

const BackToFront = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);


  useEffect(() => {
    // 데이터를 가져오는 비동기 함수 호출
    fetchData()
      .then((data) => {
        // 데이터를 받아온 후 콜백 함수 호출하여 데이터 전달
        onDataLoaded(data);
      })
      // .catch((error) => {
      //   console.error("Error fetching data:", error);
      //   // 에러 처리 로직 추가
      // });
  }, []);
 

  const onDataLoaded = (data) => {
    const newNodes = data.map((pod, index) => {
      // const containers = pod.containers.map((container, containerIndex) => {
      //   return {
      //     containerName: container.containerName,
      //     containerPort: container.containerPort,
      //     containerProtocol: container.containerProtocol,
      //     containerImage: container.containerImage,
      //     //containerStatus: container.containerStatus,
      //   };
      // });
      return {
        id: index + 1,
        name: pod.name,
        namespace: pod.namespace,
        label: pod.labels,
        status: pod.status,
        ports: pod.ports,
        containerImages: pod.containerImages
      };

    });

    const newEdges = data.flatMap((pod, index) => {
      if (pod.nextPods) {
        return pod.nextPods.map((nextPod) => {
          return {
            from: index + 1,
            to: data.findIndex((p) => p.name === nextPod.name) + 1,
          };
        });
      }
      return [];
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const namespaces = [
    ...new Set(nodes.map((node) => node.namespace)),
  ];

  const nodesByNamespace = namespaces.map((namespace) =>
    nodes.filter((node) => node.namespace === namespace)
  );

  return (
    <div>
      <NetworkGraph
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        setEdges={setEdges}
      />
    </div>
  );
};


export default BackToFront;


