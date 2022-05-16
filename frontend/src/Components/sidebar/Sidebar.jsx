import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import "./Sidebar.scss";

import {
  FcHome,
  FcCustomerSupport,
  FcCollaboration,
  FcBinoculars,
  FcLike,
  FcVoicePresentation,
  FcReadingEbook,
} from "react-icons/fc";
const Sidebar = ({category}) => {
  const {pathname} = useLocation();

  return (
    <div className="sidebar" data-aos="fade-right">
      <ul>
        <li>
          <Link className={pathname === "/" && "active"} to="/">
            <FcHome />
            Home
          </Link>
        </li>
        {category &&
          category.map((item, index) => {
            return (
              <li>
                <Link
                  className={pathname === `/${item.path}` && "active"}
                  to={item.path}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
