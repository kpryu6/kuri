import { Network } from "vis-network";
import React, { useState, useEffect } from "react";
import "./../scss/NetworkGraph.scss";

const NetworkGraph = ({ nodes, edges }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  useEffect(() => {
    const container = document.querySelector("#myNetwork");
    const data = {
      nodes: nodes.map((node) => ({
        ...node,
        label: node.name,
        shape: "dot",
        size: 50,
        font: { size: 20 },
      })),
      edges: edges,
    };
    const options = {
      width: "1250px",
      height: "785px",
      interaction: {
        zoomView: false,
      },
      nodes: {
        borderWidth: 4,
        borderWidthSelected: 10,
        color: {
          background: "#18415c",
          border: "#0a1d2a",
          highlight: {
            background: "#18415c",
            border: "#0a1d2a",
          },
        },
      },
      edges: {
        width: 5,
        length: 300,
        color: {
          color: "gray",
          highlight: "black",
        },
        smooth: {
          type: "curvedCCW",
        },
        arrows: {
          to: { enabled: true, scaleFactor: 0.5, type: "arrow" },
        },
      },
    };
    const network = new Network(container, data, options);

    network.on("click", (params) => {
      // node 클릭한 경우
      if (params.nodes.length) {
        const clickedNodeId = params.nodes[0];
        const clickedNode = nodes.find((node) => node.id === clickedNodeId);

        console.log(clickedNode);

        setSelectedNode(clickedNode);
        setSelectedEdge(null);

        const clickedNodePosition = network.getPositions([clickedNodeId]);
        const x = clickedNodePosition[clickedNodeId].x;
        const y = clickedNodePosition[clickedNodeId].y;

        const nodeInfoContainer = document.querySelector(
          ".node-info-container"
        );

        nodeInfoContainer.style.right = `${300 - x}px`;
        nodeInfoContainer.style.top = `${420 + y}px`;
      } else if (params.edges.length) {
        // edge를 클릭한 경우
        const clickedEdgeId = params.edges[0];
        const clickedEdge = edges.find((edge) => edge.id === clickedEdgeId);

        console.log(clickedEdge); // 클릭한 edge의 정보 출력 (console.log 대신 다른 처리를 할 수도 있음)
        setSelectedEdge(clickedEdge);
        // 다른 노드나 엣지를 클릭했을 때와 구분하기 위해 selectedNode를 null로 설정
        setSelectedNode(null);

        // edge의 양 끝점의 위치를 찾아서 가운데 위치 계산
        const clickedEdgePositions = network.getPositions([clickedEdgeId]);
        const fromPosition =
          clickedEdge.from in clickedEdgePositions
            ? clickedEdgePositions[clickedEdge.from]
            : network.getPositions([clickedEdge.from])[clickedEdge.from];
        const toPosition =
          clickedEdge.to in clickedEdgePositions
            ? clickedEdgePositions[clickedEdge.to]
            : network.getPositions([clickedEdge.to])[clickedEdge.to];
        const x = (fromPosition.x + toPosition.x) / 2;
        const y = (fromPosition.y + toPosition.y) / 2;

        const edgeInfoContainer = document.querySelector(
          ".edge-info-container"
        );
        edgeInfoContainer.style.right = `${400 - x}px`;
        edgeInfoContainer.style.top = `${350 + y}px`;
      } else {
        setSelectedEdge(null);
        setSelectedNode(null);
      }
    });
  }, []);

  return (
    <div
      className="parent"
      style={{ marginLeft: "-160px", marginTop: "-30px" }}
    >
      <h2 id="myNetwork"></h2>
      {selectedNode && (
        <div className="node-info-container">
          <div className="node-info">
            <p>name: {selectedNode.name}</p>
            <p>namespace: {selectedNode.namespace}</p>
            <p>labels:</p>
            <p>{"{"} </p>
            {Object.entries(selectedNode.label).map(([key, value]) => (
              <p key={key} style={{ paddingLeft: "10px" }}>
                "{key}" : "{value}"
              </p>
            ))}
            <p>{"}"} </p>

            <p>ip: {selectedNode.ip}</p>

            <p>port: {selectedNode.port}</p>
            <p>image: nginx</p>
          </div>
        </div>
      )}
      {selectedEdge && (
        <div className="edge-info-container">
          <div className="edge-info">
            <p>name: policy-name</p>
            <p>namespace: default</p>
            <p>labels:</p>

            <p>ingress:</p>
            <p style={{ paddingLeft: "10px" }}>from:</p>
            <p style={{ paddingLeft: "20px" }}>ipBlock</p>
            <p>egress:</p>

            <p>from: {selectedEdge.from} </p>
            <p>to: {selectedEdge.to} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;
