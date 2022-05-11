import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Components/header/Header";
import Sidebar from "../Components/sidebar/Sidebar";

import "./layout.scss";
const Layout = ({data, category, role, setRole}) => {
  return (
    <div className="layout">
      <Header role={role} setRole={setRole} data={data} />
      <div className="container">
        <Sidebar category={category} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
