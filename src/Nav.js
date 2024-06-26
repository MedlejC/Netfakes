import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "./assets/logo.png";
import avatar from "./assets/avatar.png";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img className="nav__logo" src={logo} onClick={() => navigate("/")} />
        <img
          className="nav__avatar"
          src={avatar}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

export default Nav;
