import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import "./Sidebar.scss";
import {AiOutlineHome} from "react-icons/ai";
import {RiMovie2Line} from "react-icons/ri";
import {GiGuitar, GiThreeLeaves} from "react-icons/gi";
import {BsFillJournalBookmarkFill} from "react-icons/bs";
import {FaDiscourse} from "react-icons/fa";
import {MdAttractions, MdOutlineSportsHandball} from "react-icons/md";
import {FiMoreHorizontal} from "react-icons/fi";

const Sidebar = ({category}) => {
  const {pathname} = useLocation();
  const [link, setLink] = useState([]);
  console.log(link);
  useEffect(() => {
    if (category) {
      const newArr = category.map((item) => {
        if (item.name === "Seminars") {
          item = {...item, path: `/${item.name}}`, icon: <AiOutlineHome />};
        } else if (item.name === "Conferences") {
          item = {...item, path: `/${item.name}}`, icon: <AiOutlineHome />};
        } else if (item.name === "Trade shows") {
          item = {
            ...item,
            path: `/${item.name.replace(/\s+/g, "")}}`,
            icon: <AiOutlineHome />,
          };
        } else if (item.name === "Festivals") {
          item = {
            ...item,
            path: `/${item.name.replace(/\s+/g, "")}}`,
            icon: <AiOutlineHome />,
          };
        } else if (item.name === "Reunions") {
          item = {
            ...item,
            path: `/${item.name.replace(/\s+/g, "")}}`,
            icon: <AiOutlineHome />,
          };
        } else if (item.name === "Workshops") {
          item = {
            ...item,
            path: `/${item.name.replace(/\s+/g, "")}}`,
            icon: <AiOutlineHome />,
          };
        }

        return item;
      });
      setLink(newArr);
    }
  }, [category]);

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link className={pathname === "/" && "active"} to="/">
            <AiOutlineHome />
            Home
          </Link>
        </li>
        {link &&
          link.map((item, index) => {
            return (
              <li>
                <Link
                  className={pathname === item.path && "active"}
                  to={item.path}
                >
                  <AiOutlineHome />
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
