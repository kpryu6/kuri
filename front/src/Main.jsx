import "./scss/Main.scss";
import React from "react";

import BackToFront from "./Graph/BackToFront";

function Main() {
  return (
    <>
      <div className="center-top">
        <div className="BackToFront">
          <BackToFront />
        </div>
      </div>
    </>
  );
}

export default Main;
