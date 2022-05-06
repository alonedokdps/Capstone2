import React, {useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import "./Sidebar.scss";
import {AiOutlineHome} from "react-icons/ai";
import {RiMovie2Line} from "react-icons/ri";
import {GiGuitar, GiThreeLeaves} from "react-icons/gi";
import {BsFillJournalBookmarkFill} from "react-icons/bs";
import {FaDiscourse} from "react-icons/fa";
import {MdAttractions, MdOutlineSportsHandball} from "react-icons/md";
import {FiMoreHorizontal} from "react-icons/fi";

const Sidebar = () => {
  const {pathname} = useLocation();

  return (
    <div className="sidebar">
      <ul>
        {/* {headerNav.map((item, index) => {
          return (
            <li>
              <Link to={item.path}>
                <img src={item.img} />
                {item.name}
              </Link>
            </li>
          );
        })} */}
        <li>
          <Link className={pathname === "/" && "active"} to="/">
            {" "}
            <AiOutlineHome />
            Home
          </Link>
        </li>
        <li>
          <Link className={pathname === "/movies" && "active"} to="/movies">
            <RiMovie2Line />
            Movies
          </Link>
        </li>
        <li>
          <Link className={pathname === "/music" && "active"} to="/music">
            {" "}
            <GiGuitar />
            Live Music
          </Link>
        </li>
        <li>
          <Link className={pathname === "/art" && "active"} to="/art">
            <GiThreeLeaves />
            Theater - Art culture
          </Link>
        </li>

        <li>
          <Link
            className={pathname === "/community" && "active"}
            to="/community"
          >
            <FaDiscourse />
            Community
          </Link>
        </li>

        <li>
          <Link className={pathname === "/course" && "active"} to="/course">
            <BsFillJournalBookmarkFill />
            Course
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/attraction" && "active"}
            to="/attraction"
          >
            {" "}
            <MdAttractions />
            Attractions
          </Link>
        </li>
        <li>
          <Link className={pathname === "/sport" && "active"} to="/sport">
            {" "}
            <MdOutlineSportsHandball />
            Sport
          </Link>
        </li>
        <li>
          <Link className={pathname === "/more" && "active"} to="/more">
            <FiMoreHorizontal />
            More
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
