import React, {useEffect, useState} from "react";
import Status from "../../Components/status/Status";
import "./AccountManagement.scss";
import {BsTrash} from "react-icons/bs";
import {GrView} from "react-icons/gr";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

const AccountManagement = ({
  ListStudent,
  department,
  ChangeId,
  handleChangeQueryListStudent,
  deleteAccount,
  nameTable,
}) => {
  const [nameDepartment, setnameDepartment] = useState("");
  console.log(nameTable);
  useEffect(() => {
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
      <h1>Account management</h1>
      <div className="Account-Management-count">
        <Status number={ListStudent.length} name="Total" />
      </div>
      <div className="Account-Management-table">
        <div className="Account-Management-table-tool">
          <div className="Account-Management-table-tool-select-box">
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
          </div>
          <div className="Account-Management-table-tool-search-box">
            <input
              onChange={handleChangeQueryListStudent}
              type="text"
              name="search"
              id="search"
              placeholder="Enter fullname student...."
            />
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
        <table id="table-student-list">
          <thead>
            <tr>
              {" "}
              <th scope="col">ID</th>
              <th scope="col">Fullname</th>
              <th scope="col">Username</th>
              <th scope="col">Department</th>
              <th scope="col">Course</th>
              <th scope="col">Class</th>
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
                    <td>{item.courseId}</td>
                    <td>{item.class}</td>
                    <td>
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
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
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
