import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Components/header/Header";
import Sidebar from "../Components/sidebar/Sidebar";

import "./layout.scss";
const Layout = ({data}) => {
  return (
    <div className="layout">
      <Header data={data} />
      <div className="container">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
