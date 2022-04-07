import React, {useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import "./Sidebar.scss";
import {
  art,
  community,
  course,
  home,
  more,
  movies,
  attraction,
  music,
  nightlife,
  sport,
} from "../../images/imgicon/Index.js";
const Sidebar = () => {
  const headerRef = useRef(null);
  const {pathname} = useLocation();
  const headerNav = [
    {
      name: "Home",
      path: "/",
      img: home,
    },
    {
      name: "Movies",
      path: "/movies",
      img: movies,
    },
    {
      name: "Music",
      path: "/music",
      img: music,
    },
    {
      name: "Art",
      path: "/art",
      img: art,
    },
    {
      name: "Nightlife",
      path: "/nightlife",
      img: nightlife,
    },
    {
      name: "Community",
      path: "/community",
      img: community,
    },
    {
      name: "Course",
      path: "/course",
      img: course,
    },
    {
      name: "Attraction",
      path: "/attraction",
      img: attraction,
    },
    {
      name: "Sport",
      path: "/",
      img: sport,
    },
    {
      name: "More",
      path: "/more",
      img: more,
    },
  ];
  console.log(headerRef);
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
            <img src={home} alt="" />
            Home
          </Link>
        </li>
        <li>
          <Link className={pathname === "/movies" && "active"} to="/movies">
            {" "}
            <img src={movies} alt="" />
            Movies
          </Link>
        </li>
        <li>
          <Link className={pathname === "/music" && "active"} to="/music">
            {" "}
            <img src={music} alt="" />
            Live Music
          </Link>
        </li>
        <li>
          <Link className={pathname === "/art" && "active"} to="/art">
            {" "}
            <img src={art} alt="" />
            Theater - Art culture
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/nightlife" && "active"}
            to="/nightlife"
          >
            {" "}
            <img src={nightlife} alt="" />
            Nightlife
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/community" && "active"}
            to="/community"
          >
            {" "}
            <img src={community} alt="" />
            Community
          </Link>
        </li>

        <li>
          <Link className={pathname === "/course" && "active"} to="/course">
            {" "}
            <img src={course} alt="" />
            Course
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/attraction" && "active"}
            to="/attraction"
          >
            {" "}
            <img src={attraction} alt="" />
            Attractions
          </Link>
        </li>
        <li>
          <Link className={pathname === "/sport" && "active"} to="/sport">
            {" "}
            <img src={sport} alt="" />
            Sport
          </Link>
        </li>
        <li>
          <Link className={pathname === "/more" && "active"} to="/more">
            {" "}
            <img src={more} alt="" />
            More
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
