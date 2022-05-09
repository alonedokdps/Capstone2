import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import ApiGetUserById from "../../api/GetUserById.api";
import ApiUpdateAvatar from "../../api/UpdateAvatar.api";
import SidebarUser from "./SidebarUser";

const UserPage = () => {
  const [user, setUser] = useState([]);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      ApiGetUserById.GetUserById(userData.id).then((data) => {
        if (data) {
          setUser(data);
        } else {
          setUser([]);
        }
      });
    }
  }, [fileName]);
  const handleSubmit = (e) => {
    const avatar = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("accountId", user?._id);
    ApiUpdateAvatar.UpdateAvatar(formData).then((data) => {
      if (data.success) {
        toast.success(data.message);
        setFileName(data?.img);
      } else {
        toast.error(data.message);
      }
    });
  };
  return (
    <div style={{padding: "20px 20px 20px 370px"}}>
      <SidebarUser data={user} handleSubmit={handleSubmit} />
      <Outlet />
    </div>
  );
};

export default UserPage;
