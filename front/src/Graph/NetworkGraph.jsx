import { Network } from "vis-network";

import React, { useState, useEffect } from "react";

import "./../scss/NetworkGraph.scss";

const NetworkGraph = ({ nodes, edges }) => {
  const [selectedNode, setSelectedNode] = useState(null);

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
      width: "1200px",
      height: "700px",

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
        width: 5, // ¿§Áö ±½±â
        length: 300,
        color: {
          color: "gray", // ¿§Áö »ö»ó
          highlight: "black", // ¼±ÅÃµÈ ¿§Áö »ö»ó
        },
        smooth: {
          type: "curvedCCW", // ¿§Áö ¸ð¾ç ÁöÁ¤
        },
        arrows: {
          to: { enabled: true, scaleFactor: 0.5, type: "arrow" },
        },
      },
    };
    const network = new Network(container, data, options);

    network.on("click", (params) => {
      if (params.nodes.length) {
        setSelectedNode(nodes.find((node) => node.id === params.nodes[0]));
      }
    });
  }, []);

  return (
    <div className="parent" style={{ marginLeft: "-280px" }}>
      <h2 id="myNetwork"></h2>
      {selectedNode && (
        <div className="node-info-container">
          <div className="node-info">
            <h1>{selectedNode.name}</h1>
            <p>namespace: {selectedNode.namespace}</p>
            <p>label:</p>
            {Object.entries(selectedNode.label).map(([key, value]) => (
              <p key={key} style={{ paddingLeft: "20px" }}>
                {key}: {value}
              </p>
            ))}
            <p>ip: {selectedNode.ip}</p>
            <p>port: {selectedNode.port}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;
