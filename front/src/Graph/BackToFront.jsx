import { useState } from "react";
import BackToFront2JSON from "./BackToFront2JSON.json";
import NetworkGraph from "./NetworkGraph";

const BackToFront = () => {
  const [nodes, setNodes] = useState(
    BackToFront2JSON.map((pod, index) => {
      return {
        id: index + 1,
        name: pod.name,
        namespace: pod.namespace,
        label: pod.labels,
        ip: pod.ip,
        port: pod.port,
      };
    })
  );

  const [edges, setEdges] = useState(
    BackToFront2JSON.flatMap((pod, index) => {
      return pod.nextPods.map((nextPod) => {
        return {
          from: index + 1,
          to: BackToFront2JSON.findIndex((p) => p.name === nextPod.name) + 1,
        };
      });
    })
  );

  //namespace 별
  const namespaces = [
    ...new Set(nodes.map((node) => node.namespace)), // 중복 제거한 namespace 목록
  ];

  const nodesByNamespace = namespaces.map((namespace) =>
    nodes.filter((node) => node.namespace === namespace)
  );

  const [selectedNamespace, setSelectedNamespace] = useState(namespaces[0]);
  const selectedNamespaceIndex = namespaces.indexOf(selectedNamespace);

  return (
    <div>
      <div className="namespace-buttons">
        {namespaces.map((namespace, index) => (
          <button
            key={index}
            onClick={() => setSelectedNamespace(namespace)}
            className={selectedNamespace === namespace ? "active" : ""}
          >
            {namespace}
          </button>
        ))}
      </div>
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
