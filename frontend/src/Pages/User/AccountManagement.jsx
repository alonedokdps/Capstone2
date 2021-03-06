import React, {useEffect, useState} from "react";
import Status from "../../Components/status/Status";
import "./AccountManagement.scss";
import {BsTrash} from "react-icons/bs";

import ReactHtmlTableToExcel from "react-html-table-to-excel";
import ApiCourses from "../../api/Course.api";

const AccountManagement = ({
  ListStudent,
  department,
  ChangeId,
  handleChangeQueryListStudent,
  deleteAccount,
  nameTable,
  role,
}) => {
  const [nameDepartment, setnameDepartment] = useState("");
  const [khoa, setKhoa] = useState([]);

  useEffect(() => {
    ApiCourses.getCourses().then((res) => {
      if (res) {
        setKhoa(res);
      } else {
        setKhoa([]);
      }
    });
    if (nameTable === "") return setnameDepartment("All student");
    if (department) {
      const name = department.filter((department) => {
        if (department._id === nameTable) {
          return department;
        }
      });
      setnameDepartment(name[0]?.name);
    }
  }, [department, nameTable]);
  return (
    <div className="Account-Management">
      <h1 data-aos="fade-right">Account management</h1>
      <div data-aos="fade-right" className="Account-Management-count">
        <Status number={ListStudent.length} name="Total" />
      </div>
      <div className="Account-Management-table">
        <div className="Account-Management-table-tool" data-aos="fade-left">
          <div className="Account-Management-table-tool-select-box">
            {role === "Admin" && (
              <select
                id="department"
                name="department"
                onChange={handleChangeQueryListStudent}
              >
                <option value="">All</option>
                {department &&
                  department.map((item) => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
              </select>
            )}

            {role === "DepartmentManager" && (
              <select
                id="courses"
                name="courses"
                onChange={handleChangeQueryListStudent}
              >
                <option value="">All</option>
                {khoa &&
                  khoa.map((item) => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
              </select>
            )}
          </div>
          <div className="Account-Management-table-tool-search-box">
            <input
              onChange={handleChangeQueryListStudent}
              type="text"
              name="search"
              id="search"
              placeholder="Enter fullname student...."
            />
            {role === "DepartmentManager" && (
              <input
                onChange={handleChangeQueryListStudent}
                type="text"
                name="classess"
                id="classess"
                placeholder="Enter classes ...."
              />
            )}
          </div>
          <div className="Account-Management-table-tool-btn-export">
            <ReactHtmlTableToExcel
              id="test-table-xls-button"
              table="table-student-list"
              filename={nameDepartment}
              sheet="tablexls"
              buttonText="Export to excel"
            />
          </div>
        </div>
        <table id="table-student-list" data-aos="zoom-in-up">
          <thead>
            <tr>
              {" "}
              <th scope="col">ID</th>
              <th scope="col">Fullname</th>
              <th scope="col">Username</th>
              <th scope="col">Department</th>
              {role === "DepartmentManager" && <th scope="col">Course</th>}
              {role === "DepartmentManager" && <th scope="col">Class</th>}
              {role === "DepartmentManager" && <th scope="col">Score</th>}
              <th scope="col">Tool</th>
            </tr>
          </thead>
          <tbody>
            {ListStudent &&
              ListStudent.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.fullname}</td>
                    <td>{item.username}</td>
                    <td>{item.departmentId}</td>
                    {role === "DepartmentManager" && <td>{item.courseId}</td>}
                    {role === "DepartmentManager" && <td>{item.class}</td>}
                    {role === "DepartmentManager" && (
                      <td>
                        <span
                          className={`color-score ${
                            item.score >= 70
                              ? "high"
                              : item.score < 70 && item.score >= 55
                              ? "medium"
                              : "low"
                          }`}
                        >
                          {item.score}
                        </span>
                      </td>
                    )}

                    <td>
                      {role === "Admin" && (
                        <div className="select-change-role">
                          <select
                            value={item.role}
                            data-id={item._id}
                            onChange={ChangeId}
                          >
                            <option value="DepartmentManager">
                              Department Manager
                            </option>
                            <option value="User">User</option>
                          </select>
                        </div>
                      )}
                      <div className="button-for-user">
                        <button onClick={() => deleteAccount(item._id)}>
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagement;
