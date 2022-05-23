import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import ApiDepartment from "../../api/Department.api";
import ApiGetUserById from "../../api/GetUserById.api";
import ApiUpdateAvatar from "../../api/UpdateAvatar.api";
import SidebarUser from "./SidebarUser";

const UserPage = ({updateStatus, setUpdateStatus, role}) => {
  const [user, setUser] = useState([]);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      ApiGetUserById.GetUserById(userData.id).then((data) => {
        if (data) {
          ApiDepartment.getDepartments().then((res) => {
            const department = res.find((dep) => dep._id === data.departmentId);
            if (department) {
              setUser({...data, departmentId: department.name});
            }
          });
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
        setUpdateStatus((prev) => updateStatus + 1);
      } else {
        toast.error(data.message);
      }
    });
  };
  return (
    <div style={{padding: "20px 20px 20px 370px"}}>
      <SidebarUser data={user} role={role} handleSubmit={handleSubmit} />
      <Outlet />
    </div>
  );
};

export default UserPage;
