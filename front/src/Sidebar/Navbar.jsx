import React from "react";
import { FaThLarge, FaGithub } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { TbChartCircles } from "react-icons/tb";
import { MdOutlinePolicy } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "../scss/navbar.scss";

const ICON_SIZE = 30;

function Navbar({ visible, show }) {
  return (
    <>
      <nav className="navbar">
        <div>
          <NavLink className="logo" to="/main">
            <img
              src="https://user-images.githubusercontent.com/113777043/219305022-a306d523-edfc-430e-b465-00094aca2c39.png"
              alt="Logo"
            />
            KURI
          </NavLink>
          <h2>Kubenetes Network Policy Simulator</h2>
          <div className="links nav-top">
            <NavLink to="/main" className="nav-link">
              <FaThLarge size={ICON_SIZE} />
              <span>Main </span>
            </NavLink>
            <NavLink to="/pods" className="nav-link">
              <TbChartCircles size={ICON_SIZE} />
              <span>Pods </span>
            </NavLink>

            <NavLink to="/policies" className="nav-link">
              <MdOutlinePolicy size={ICON_SIZE} />
              <span>Policies </span>
            </NavLink>

            <NavLink to="/upload" className="nav-link">
              <FiUpload size={ICON_SIZE} />
              <span>Upload</span>
            </NavLink>
          </div>
        </div>

        <div className="links">
          <NavLink to="https://github.com/boanlab/kuri" className="nav-link">
            <FaGithub size={ICON_SIZE} />
            <span>GitHub</span>
          </NavLink>
          <NavLink to="https://github.com/boanlab/kuri" className="nav-link">
            <BiHelpCircle size={ICON_SIZE} />
            <span>Help</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
