import React, {useEffect, useState} from "react";
import "./Login.scss";
import SignIn from "../../Components/SignIn-SignUp/SignIn";
import SignUp from "../../Components/SignIn-SignUp/SignUp";
import HomeButton from "../../Components/rediectHome/HomeButton";
import logo from "../../images/imgicon/logo.svg";
import AOS from "aos";
import "aos/dist/aos.css";
const Login = ({getForm}) => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="full-w-h-ab login" data-aos="zoom-in-up">
      <HomeButton />
      {getForm === "login" && (
        <>
          {" "}
          <div className="typewriter" data-aos="fade-right">
            <h1>
              DEVENT <img src={logo} className="logo" />
            </h1>
          </div>
          <SignIn />
        </>
      )}{" "}
      {getForm === "register" && (
        <>
          {" "}
          <SignUp />
        </>
      )}
    </div>
  );
};

export default Login;
