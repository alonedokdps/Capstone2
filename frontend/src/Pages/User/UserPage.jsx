import React from "react";
import {Outlet} from "react-router-dom";
import SidebarUser from "./SidebarUser";

const UserPage = () => {
  return (
    <div style={{padding: "50px 0px 0px 370px"}}>
      <SidebarUser />
      <Outlet />
    </div>
  );
};

export default UserPage;
