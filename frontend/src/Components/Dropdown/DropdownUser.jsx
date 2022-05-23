import React from "react";
import {Link} from "react-router-dom";
import "./style.scss";
import {AiFillSetting} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";
import {MdEvent} from "react-icons/md";
import {FaToolbox} from "react-icons/fa";

import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

const DropdownUser = ({setRole, role, userById}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  return (
    <div className="dropdown-user" data-aos="zoom-in-down">
      <div className="dropdown-user-infomini">
        <div className="dropdown-user-infomini-avatar">
          <img
            src={
              userById.avatar
                ? `http://localhost:8000/${userById.avatar}`
                : "https://scontent.fdad3-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=JnDLo_5PpjYAX9zaReD&_nc_oc=AQnI0cWER_r6mjFCD6e6GL2WziUZtgXLqF3QTO3AAExpM-2CCq21fvwvF-D3qJ_Di8HQH_JFUTp9f9IG4jpJp2p7&_nc_ht=scontent.fdad3-6.fna&oh=00_AT-xlXhgljBhE8R1-KDEK-qWrN11O6wZ5rw25R2j4eIkSw&oe=62970D78"
            }
            alt=""
          />
        </div>
        <div className="dropdown-user-infomini-text">
          <h4>{userById.fullname}</h4>
          <span>{userById.role}</span>
          <span>{userById.departmentId}</span>
        </div>
      </div>
      <Link to="/user/profile">
        <div className="dropdown-user-item">
          <AiFillSetting />
          Profile
        </div>
      </Link>
      {role === "Admin" || role === "DepartmentManager" ? (
        <>
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
        </>
      ) : (
        <Link to="/user/MyEvent">
          <div className="dropdown-user-item">
            <MdEvent /> My Event
          </div>
        </Link>
      )}

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
