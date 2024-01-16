import React from "react";
import "../../scss/PodDetail.scss";
function PodDetail() {
  return (
    <div className="pod-details">
      <dt className="pod-yaml">
        pod1.yaml
        <dd>yaml script</dd>
      </dt>
      <div className="flex-item">
        <div className="pod_and_policy">
          <dt1 className="next-pod">
            <dd1>next-pod</dd1>
          </dt1>
          <dt2 className="policy-about-pod">
            <dd2></dd2>
          </dt2>
        </div>

        <dt3 className="pod-detail-result"></dt3>
      </div>
    </div>
  );
}

export default PodDetail;
