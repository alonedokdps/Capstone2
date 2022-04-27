import React, {useEffect, useRef, useState} from "react";
import {BiUserCircle} from "react-icons/bi";
import {Link, useLocation} from "react-router-dom";
import "./sidebaruser.scss";
import {BsArrowLeft} from "react-icons/bs";
import {MdEvent} from "react-icons/md";
const sidebarNavItems = [
  {
    name: "Account",
    icon: <BiUserCircle />,
    to: "account",
    section: "account",
  },
  {
    name: "Event",
    icon: <MdEvent />,
    to: "event",
    section: "event",
  },
];
const SidebarUser = () => {
  const location = useLocation();
  const checkActive = (name) => {
    const x = location.pathname.includes(name);
    return x;
  };
  return (
    <div className="sidebaruser">
      <Link to="/">
        <div className="sidebaruser__btn">
          <BsArrowLeft />
          Back home
        </div>
      </Link>
      <div className="sidebaruser__logo">{"name accout"}</div>
      <div className="sidebaruser__menu">
        <div className="sidebaruser__menu__indicator">
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebaruser__menu__item ${
                  checkActive(item.to) ? "active" : ""
                }`}
              >
                <div className="sidebaruser__menu__item__icon">{item.icon}</div>
                <div className="sidebaruser__menu__item__text">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;
