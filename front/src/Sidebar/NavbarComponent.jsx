import React, { useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../scss/NavbarComponent.scss";
import Main from "../Main";
import Pods from "../Pods";
function NavbarComponent() {
  const [navVisible, showNavbar] = useState(false);

  return (
    <BrowserRouter>
      <div className="NavbarComponent">
        <Navbar visible={navVisible} show={showNavbar} />
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route
            path="/main"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>
                  <Main />
                </h1>
              </div>
            }
          />
          <Route
            path="/pods"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>
                  <Pods />
                </h1>
              </div>
            }
          />
          <Route
            path="/policies"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Policies</h1>
              </div>
            }
          />
          <Route
            path="/settings"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Settings</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default NavbarComponent;
