import React, {useEffect, useState} from "react";
import "./Header.scss";
import {useCookies} from "react-cookie";

import {AiOutlineClose, AiOutlineSearch} from "react-icons/ai";
import {BsCalendar2Event} from "react-icons/bs";
import {RiUser3Line} from "react-icons/ri";

import {BsBell} from "react-icons/bs";

import logo from "../../images/imgicon/logo.svg";
import {CgMenuLeftAlt} from "react-icons/cg";
import {BsPatchPlus} from "react-icons/bs";
import {Link} from "react-router-dom";
import DropdownUser from "../Dropdown/DropdownUser";
import useClickOutSide from "../../hooks/useClickOutSide";
import ApiSearch from "../../api/SearchEvent.api.js";
import AOS from "aos";
import "aos/dist/aos.css";
const Header = ({data, role, setRole}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [click, setClick] = useState(false);
  const [active, setActive] = useState(false);
  const [fillterData, setFillterData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const {show, setShow, nodeRef} = useClickOutSide();

  useEffect(() => {
    AOS.init();
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setRole(user.role);
      setCookie("token", user.token, {path: "/"});
    } else {
      setRole("");
    }
  }, [setCookie, setRole]);
  const handleChangeSearch = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    const abortController = new AbortController();
    ApiSearch.SearchApi(keyword)
      .then((res) => {
        setFillterData(res.data);
      })
      .catch((error) => console.log(error));
    return () => {
      abortController.abort();
    };
  }, [keyword]);
  const activeHeader = () => {
    if (window.scrollY > 80) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  const ResetFilter = () => {
    setFillterData([]);
    setKeyword("");
  };
  useEffect(() => {
    window.addEventListener("scroll", activeHeader);
    return () => {
      window.removeEventListener("scroll", activeHeader);
    };
  }, []);
  return (
    <>
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
        <div className="logo-header" data-aos="flip-left">
          <Link to="/">
            DEVENT <img src={logo} style={{width: "30px"}} />
          </Link>
        </div>
        <div className="search" data-aos="zoom-in">
          <AiOutlineSearch className="icon-search" />
          <input
            type="text"
            value={keyword}
            placeholder="Search..."
            onChange={handleChangeSearch}
          />
          <div className="result-search">
            {fillterData &&
              fillterData.length > 0 &&
              fillterData.map((item) => (
                <Link to={`/detail/${item._id}`} onClick={ResetFilter}>
                  <div className="result-item">
                    <img src={`http://localhost:8000/${item.img}`} />
                    <h4>{item.name}</h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="user-icon">
          <BsBell
            style={{
              fontSize: "25px",
              margin: "0 20px",
              color: "black",
              cursor: "pointer",
            }}
          />
          {cookies.token && (
            <BsCalendar2Event
              data-aos="fade-right"
              style={{
                fontSize: "25px",
                margin: "0 20px",
                color: "black",
                cursor: "pointer",
              }}
            />
          )}
          {role && role === "Admin" && (
            <Link to="/add-event" className="icon-add">
              <BsPatchPlus
                data-aos="fade-down"
                style={{
                  fontSize: "25px",
                  margin: "0 20px",
                  color: "black",
                  cursor: "pointer",
                }}
              />
            </Link>
          )}
          {!cookies.token && (
            <Link data-aos="fade-left" to="/login" className="sign-in">
              Sign in | Sign up
            </Link>
          )}
          {cookies.token && (
            <div
              className="user-button"
              ref={nodeRef}
              onClick={() => setShow(!show)}
            >
              <RiUser3Line
                data-aos="fade-left"
                style={{
                  fontSize: "25px",
                  margin: "0 20px",
                  color: "black",
                  cursor: "pointer",
                }}
              />
              {show && <DropdownUser setRole={setRole} />}
            </div>
          )}
        </div>
        <div className="user-icon-mobile">
          <RiUser3Line />
        </div>
      </div>
    </>
  );
};

export default Header;
