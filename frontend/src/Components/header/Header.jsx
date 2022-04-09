import React, {useEffect, useState} from "react";
import "./Header.scss";

import {AiOutlineClose, AiOutlineUser, AiOutlineSearch} from "react-icons/ai";
import logo from "../../images/imgicon/logo.svg";
import {CgMenuLeftAlt} from "react-icons/cg";
import {Link} from "react-router-dom";
const Header = () => {
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
        <Link to="/">
          <button>Create Event</button>
        </Link>
        <Link to="/login" className="sign-in">
          Sign in | Sign up
        </Link>
      </div>
      <div className="user-icon-mobile">
        <AiOutlineUser />
      </div>
    </div>
  );
};

export default Header;
