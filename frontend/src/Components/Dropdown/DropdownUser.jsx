import React from "react";
import {Link} from "react-router-dom";
import "./style.scss";
import {AiFillSetting} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";
import {MdEvent} from "react-icons/md";
import {FaToolbox} from "react-icons/fa";

import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

const DropdownUser = ({setRole}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  return (
    <div className="dropdown-user" data-aos="zoom-in-down">
      <Link to="/user/profile">
        <div className="dropdown-user-item">
          <AiFillSetting />
          Profile
        </div>
      </Link>
      <Link to="/user/event">
        <div className="dropdown-user-item">
          <MdEvent /> Event
        </div>
      </Link>
      <Link to="/user/management-account">
        <div className="dropdown-user-item">
          <FaToolbox /> Account management
        </div>
      </Link>

      <div
        onClick={() => {
          removeCookie("token", {path: "/"});
          localStorage.clear();
          setRole("");
          window.location.reload();
        }}
        className="dropdown-user-item"
      >
        <BiLogOut /> Logout
      </div>
    </div>
  );
};

export default DropdownUser;
