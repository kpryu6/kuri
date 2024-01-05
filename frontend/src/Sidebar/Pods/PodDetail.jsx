import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../scss/PodDetail.scss";

const PodDetail = ({pod}) => {
  return (
    <div className="pod-detail">
      <div className="container-title">Pod Detail</div>
      <div className="container-info">
        <div className="container-name">Name: {pod.name}</div>
        <div className="container-property">
          <label>Kind:</label>
          <span className="container-property-value">{pod.kind}</span>
        </div>
        <div className="container-property">
          <label>Kind Name:</label>
          <span className="container-property-value">{pod.kindName}</span>
        </div>
        <div className="container-property">
          <label>Labels:</label>
          <div className="labels-container">
            {Object.entries(pod.labels).map(([key, value]) => (
              <div key={key} className="label-item">
                <span className="label-key">{key}:</span>
                <span className="label-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="container-property">
          <label>Namespace:</label>
          <span className="container-property-value">{pod.namespace}</span>
        </div>
        <div className="container-property">
          <label>IP:</label>
          <span className="container-property-value">{pod.ip}</span>
        </div>
        <div className="container-property">
          <label>Status:</label>
          <span className="container-property-value">{pod.status}</span>
        </div>
      </div>
      <div className="container-details">
        <div className="container-title">Containers</div>
        {pod.containers.map((container, index) => (
          <div key={index} className="container-info">
            <div className="container-name">
              {index + 1}. {container.containerName}
            </div>
            <div className="container-property">
              <label>Container Port:</label>
              <span className="container-property-value">
                {container.containerPort}
              </span>
            </div>
            <div className="container-property">
              <label>Container Protocol:</label>
              <span className="container-property-value">
                {container.containerProtocol}
              </span>
            </div>
            <div className="container-property">
              <label>Container Image:</label>
              <span className="container-property-value">
                {container.containerImage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PodDetail.propTypes = {
  pod: PropTypes.object.isRequired,
};

export default PodDetail;
