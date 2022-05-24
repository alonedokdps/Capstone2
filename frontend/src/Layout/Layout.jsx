import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Components/header/Header";
import ScrollIntoView from "../Components/ScrollIntoView/ScrollIntoView";
import Sidebar from "../Components/sidebar/Sidebar";

import "./layout.scss";
const Layout = ({category, userById, role, setRole, thongbaouser}) => {
  return (
    <div className="layout">
      <Header
        thongbaouser={thongbaouser}
        userById={userById}
        role={role}
        setRole={setRole}
      />
      <div className="container">
        <Sidebar category={category} />
        <div className="content">
          <Outlet />
          <ScrollIntoView />
        </div>
      </div>
    </div>
  );
};

export default Layout;
