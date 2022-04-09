import React, {useEffect, useState} from "react";
import "./Login.scss";
import SignIn from "../../Components/SignIn-SignUp/SignIn";
import SignUp from "../../Components/SignIn-SignUp/SignUp";
import HomeButton from "../../Components/rediectHome/HomeButton";
import logo from "../../images/imgicon/logo.svg";
const Login = () => {
  const [switchs, setSwictchs] = useState(false);

  return (
    <div className="full-w-h-ab login">
      <HomeButton />
      <div className="typewriter">
        <h1>
          DEVENT <img src={logo} className="logo" />
        </h1>
      </div>
      {switchs ? (
        <SignUp change={setSwictchs} />
      ) : (
        <SignIn change={setSwictchs} />
      )}
    </div>
  );
};

export default Login;
