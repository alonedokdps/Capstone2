import React, {useEffect, useRef, useState} from "react";
import {BiUserCircle} from "react-icons/bi";
import {Link, useLocation} from "react-router-dom";
import "./sidebaruser.scss";
import {BsArrowLeft, BsFillCameraFill} from "react-icons/bs";
import {MdEvent} from "react-icons/md";
import {FaToolbox} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";
const sidebarNavItems = [
  {
    name: "Profile",
    icon: <BiUserCircle />,
    to: "profile",
    section: "account",
  },
  {
    name: "Event",
    icon: <MdEvent />,
    to: "event",
    section: "event",
  },
  {
    name: "Account management",
    icon: <FaToolbox />,
    to: "management-account",
    section: "management-account",
  },
];
const SidebarUser = ({data, handleSubmit}) => {
  const [avatar, setAvatar] = useState("");
  const location = useLocation();

  useEffect(() => {
    AOS.init();
  });

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
      <div className="sidebaruser__avatar">
        <form action="" className="sidebaruser__avatar__form">
          <div className="box-avatar">
            <label htmlFor="avatar" className="avatar-user">
              <img
                data-aos="flip-left"
                src={
                  data.avatar
                    ? `http://localhost:8000/${data.avatar}`
                    : "https://scontent.fdad3-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=JnDLo_5PpjYAX9zaReD&_nc_oc=AQnI0cWER_r6mjFCD6e6GL2WziUZtgXLqF3QTO3AAExpM-2CCq21fvwvF-D3qJ_Di8HQH_JFUTp9f9IG4jpJp2p7&_nc_ht=scontent.fdad3-6.fna&oh=00_AT-xlXhgljBhE8R1-KDEK-qWrN11O6wZ5rw25R2j4eIkSw&oe=62970D78"
                }
                name="avatar"
                alt=""
              />
              <input
                type="file"
                name="avatar"
                onChange={handleSubmit}
                id="avatar"
                style={{visibility: "hidden", opacity: "0"}}
                className="input-file-avatar"
              />
              <span className="icon-camera">
                <BsFillCameraFill />
              </span>
            </label>
            <div className="user-role" data-aos="fade-left">
              <h4>{data.fullname}</h4>
              <span>{data.role}</span>
            </div>
          </div>
        </form>
        {/* <h1> Hi! {data?.fullname && data.fullname}</h1> */}
      </div>
      <div className="sidebaruser__menu">
        <div className="sidebaruser__menu__indicator">
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                data-aos="zoom-in-up"
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
