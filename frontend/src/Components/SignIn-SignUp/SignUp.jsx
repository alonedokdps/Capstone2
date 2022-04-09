import React from "react";
import "./Style.scss";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import Button from "../button/Button";
import Eye from "../eye/Eye";
const SignUp = ({change}) => {
  const style = {color: "#2dc275", cursor: "pointer"};
  return (
    <form>
      <h3>
        SIGN UP{" "}
        <HiOutlineSwitchHorizontal
          style={style}
          onClick={() => change(false)}
        />
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
          type="text"
          id="username3"
          placeholder="Enter your password"
        />
      </div>
      <div class="text-field">
        <label for="username3">Password</label>
        <input
          autocomplete="off"
          type="text"
          id="username3"
          placeholder="Enter your password"
        />
      </div>
      <div class="text-field">
        <label for="username3">Password</label>
        <input
          autocomplete="off"
          type="text"
          id="username3"
          placeholder="Enter your password"
        />
        <Eye />
      </div>
      <div class="text-field">
        <label for="username3">Password</label>
        <input
          autocomplete="off"
          type="text"
          id="username3"
          placeholder="Enter your password"
        />
        <Eye />
      </div>
      <div className="text-field button-register">
        <Button buttonStyle="btn-clear">
          <span>Clear</span>
        </Button>
        <Button buttonStyle="btn-register">
          <span>Sign up</span>
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
