import "./scss/Main.scss";
import React from "react";

import BackToFront from "./Graph/BackToFront";
//import BackToFront from "./Graph/BackToFront_JSON";

// TODO: 메인화면
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
