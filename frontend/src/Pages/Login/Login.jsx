import React, {useState} from "react";
import "./Login.scss";
import SignIn from "../../Components/SignIn-SignUp/SignIn";
import SignUp from "../../Components/SignIn-SignUp/SignUp";

const Login = () => {
  const [switchs, setSwictchs] = useState(false);
  return (
    <div className="full-w-h-ab login">
      {switchs ? (
        <SignUp change={setSwictchs} />
      ) : (
        <SignIn change={setSwictchs} />
      )}
    </div>
  );
};

export default Login;
