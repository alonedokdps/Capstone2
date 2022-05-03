import React, {useEffect, useState} from "react";
import "./Header.scss";
import {useCookies} from "react-cookie";

import {AiOutlineClose, AiOutlineUser, AiOutlineSearch} from "react-icons/ai";
import {BiCalendarEvent} from "react-icons/bi";

import logo from "../../images/imgicon/logo.svg";
import {CgMenuLeftAlt} from "react-icons/cg";
import {Link} from "react-router-dom";
import DropdownUser from "../Dropdown/DropdownUser";
import useClickOutSide from "../../hooks/useClickOutSide";
import ApiSearch from "../../api/SearchEvent.api.js";
const Header = ({data}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [click, setClick] = useState(false);
  const [active, setActive] = useState(false);
  const [fillterData, setFillterData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const {show, setShow, nodeRef} = useClickOutSide();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setRole(user.role);
    } else {
      setRole("");
    }
  }, []);
  const handleChangeSearch = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    ApiSearch.SearchApi(keyword)
      .then((res) => {
        setFillterData(res.data);
      })
      .catch((error) => console.log(error));
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
        <input
          type="text"
          value={keyword}
          placeholder="Search"
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
        {cookies.token && (
          <BiCalendarEvent
            style={{fontSize: "30px", margin: "0 20px", color: "#2dc275"}}
          />
        )}
        {role && role === "Admin" && (
          <Link to="/add-event">
            <button>Create Event</button>
          </Link>
        )}
        {!cookies.token && (
          <Link to="/login" className="sign-in">
            Sign in | Sign up
          </Link>
        )}
        {cookies.token && (
          <div
            className="user-button"
            ref={nodeRef}
            onClick={() => setShow(!show)}
          >
            <AiOutlineUser
              style={{
                fontSize: "30px",
                margin: "0 20px",
                color: "#2dc275",
                cursor: "pointer",
              }}
            />
            {show && <DropdownUser setRole={setRole} />}
          </div>
        )}
      </div>
      <div className="user-icon-mobile">
        <AiOutlineUser />
      </div>
    </div>
  );
};

export default Header;
