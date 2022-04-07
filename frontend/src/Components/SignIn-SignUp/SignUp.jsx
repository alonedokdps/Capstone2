import React from "react";
import "./Style.scss";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import Button from "../button/Button";
const SignUp = ({change}) => {
  return (
    <form>
      <h3>
        SIGN UP <HiOutlineSwitchHorizontal onClick={() => change(false)} />
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
      <Button buttonStyle="btn-login">
        <span>Sign in</span>
      </Button>
    </form>
  );
};

export default SignUp;
