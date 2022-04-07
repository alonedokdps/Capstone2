import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "../Components/header/Header";
import Sidebar from "../Components/sidebar/Sidebar";

import Detail from "../Pages/detail/Detail";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import "./layout.scss";
const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
