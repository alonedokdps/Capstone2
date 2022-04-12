import React, {useState} from "react";
import "./Login.scss";
import SignIn from "../../Components/SignIn-SignUp/SignIn";
import SignUp from "../../Components/SignIn-SignUp/SignUp";
import HomeButton from "../../Components/rediectHome/HomeButton";
import logo from "../../images/imgicon/logo.svg";
const Login = ({getForm}) => {
  return (
    <div className="full-w-h-ab login">
      <HomeButton />
      {getForm === "login" && (
        <>
          {" "}
          <div className="typewriter">
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
