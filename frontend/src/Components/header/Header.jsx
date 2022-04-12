import React, {useEffect, useState} from "react";
import "./Header.scss";
import {useCookies} from "react-cookie";

import {
  AiOutlineClose,
  AiFillBell,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import logo from "../../images/imgicon/logo.svg";
import {CgMenuLeftAlt} from "react-icons/cg";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  console.log(cookies);
  const [click, setClick] = useState(false);
  const [active, setActive] = useState(false);
  const activeHeader = () => {
    if (window.scrollY > 80) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", activeHeader);
    return () => {
      window.removeEventListener("scroll", activeHeader);
      // console.log("cleaned");
    };
  }, []);
  return (
    <div className={active ? "header active" : "header"}>
      <ul className={click ? "menu-on-mobile active" : "menu-on-mobile"}>
        <li>
          <Link to="/"> Sign in | Sign up</Link>
        </li>
        <li>
          <Link to="/"> Create</Link>
        </li>
        <li>
          <Link to="/"> Sign in | Sign up</Link>
        </li>
        <li>
          <Link to="/"> Create</Link>
        </li>
        <li>
          <Link to="/"> Sign in | Sign up</Link>
        </li>
        <li>
          <Link to="/"> Create</Link>
        </li>
      </ul>
      <div className="menu-mobile" onClick={() => setClick(!click)}>
        {click ? <AiOutlineClose /> : <CgMenuLeftAlt />}
      </div>
      <div className="logo-header">
        <Link to="/">
          DEVENT <img src={logo} style={{width: "30px"}} />
        </Link>
      </div>
      <div className="search">
        <AiOutlineSearch className="icon-search" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="user-icon">
        {cookies.token && (
          <AiFillBell
            style={{fontSize: "30px", margin: "0 20px", color: "#FFF300"}}
          />
        )}
        <Link to="/">
          <button>Create Event</button>
        </Link>
        {!cookies.token && (
          <Link to="/login" className="sign-in">
            Sign in | Sign up
          </Link>
        )}
        {cookies.token && (
          <AiOutlineUser
            onClick={() => {
              removeCookie("token", {path: "/"});

              toast.info("Logout");
            }}
            style={{fontSize: "30px", margin: "0 20px", color: "#2dc275"}}
          />
        )}
      </div>
      <div className="user-icon-mobile">
        <AiOutlineUser />
      </div>
    </div>
  );
};

export default Header;
