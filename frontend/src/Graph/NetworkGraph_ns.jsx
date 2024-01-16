import { Network } from "vis-network";
import React, { useState, useEffect } from "react";
import "./../scss/NetworkGraph.scss";

const NetworkGraph = ({ nodes, edges }) => {
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [filteredNodes, setFilteredNodes] = useState([]);

  useEffect(() => {
    const filtered = nodes.filter((node) => node.namespace === "default");
    setFilteredNodes(filtered);
  }, [nodes]);
  

  useEffect(() => {
    const container = document.querySelector("#myNetwork");

    const data = {
      nodes: filteredNodes.map((node) => ({
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
      const mousePosition = params.pointer.DOM;
      const x = mousePosition.x;
      const y = mousePosition.y;

      // node 클릭한 경우
      if (params.nodes.length) {
        const clickedNodeId = params.nodes[0];
        const clickedNode = nodes.find((node) => node.id === clickedNodeId);

        console.log(clickedNode);

        setSelectedNode(clickedNode);
        setSelectedEdge(null);

        const nodeInfoContainer = document.querySelector(
          ".node-info-container"
        );

        if (nodeInfoContainer) {
          nodeInfoContainer.style.right = `${x}px`;
          nodeInfoContainer.style.top = `${y}px`;
        }
      } else if (params.edges.length) {
        // edge를 클릭한 경우
        const clickedEdgeId = params.edges[0];
        const clickedEdge = edges.find((edge) => edge.id === clickedEdgeId);

        console.log(clickedEdge);
        setSelectedEdge(clickedEdge);
        setSelectedNode(null);

        const edgeInfoContainer = document.querySelector(
          ".edge-info-container"
        );
        if (edgeInfoContainer) {
          edgeInfoContainer.style.right = `${x}px`;
          edgeInfoContainer.style.top = `${y}px`;
        }
      } else {
        setSelectedEdge(null);
        setSelectedNode(null);
      }
    });
  }, [edges, filteredNodes]);

  return (
    <div
      className="parent"
      style={{ marginLeft: "-160px", marginTop: "-30px" }}
    >
      <h2 id="myNetwork">Network</h2>
      {selectedNode && (
        <div className="node-info-container">
          <div className="node-info">
            <p>name: {selectedNode.name}</p>
            <p>namespace: {selectedNode.namespace}</p>
            <p>labels:</p>
            <p>{"{"} </p>
            {selectedNode?.label &&
              Object.entries(selectedNode.label).map(([key, value]) => (
                <p key={key} style={{ paddingLeft: "10px" }}>
                  "{key}" : "{value}"
                </p>
              ))}
            <p>{"}"} </p>

            <p>ip: {selectedNode?.ip}</p>

            <p>ports:</p>
            <p>{"{"} </p>
            {selectedNode?.ports &&
              selectedNode.ports.map((port, index) => (
                <p key={index} style={{ paddingLeft: "10px" }}>
                  {port === "none" ? "None" : port}
                </p>
              ))}
            <p>{"}"} </p>
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
