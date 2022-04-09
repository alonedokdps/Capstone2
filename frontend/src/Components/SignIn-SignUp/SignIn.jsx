import React, {useState} from "react";
import Button from "../button/Button";
import "./Style.scss";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import Eye from "../eye/Eye";
const SignIn = ({change}) => {
  const [showPass, setShowPass] = useState(false);
  const style = {color: "#2dc275", cursor: "pointer"};
  return (
    <form>
      <h3>
        SIGN IN{" "}
        <HiOutlineSwitchHorizontal style={style} onClick={() => change(true)} />
      </h3>
      <div class="text-field">
        <label for="username3">Username</label>
        <input
          autocomplete="off"
          type="text"
          id="username3"
          placeholder="Enter your username"
        />
      </div>
      <div class="text-field">
        <label for="username3">Password</label>
        <input
          autocomplete="off"
          type={showPass ? "text" : "password"}
          id="username3"
          placeholder="Enter your password"
        />
        <Eye showPass={showPass} setShowPass={setShowPass} />
      </div>

      <div className="text-field">
        <Button buttonStyle="btn-login">
          <span>Sign in</span>
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
