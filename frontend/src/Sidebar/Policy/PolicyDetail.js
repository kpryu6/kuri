import { useSSRSafeId } from "@react-aria/ssr";
import React, { useState } from "react";
import { Visibility } from "semantic-ui-react";
import PolicyInside from "./PolicyInside";

const PolicyDetail = ({ item }) => {
  return (
    <div
      style={{
        fontSize: "1rem",
      }}
    >
      <PolicyInside></PolicyInside>
      {JSON.stringify(item)}
    </div>
  );
};

export default PolicyDetail;
