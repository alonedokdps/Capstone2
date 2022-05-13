import React from "react";
import Status from "../../Components/status/Status";
import "./AccountManagement.scss";
import {BsTrash} from "react-icons/bs";
import {GrView} from "react-icons/gr";

const AccountManagement = () => {
  return (
    <div className="Account-Management">
      <h1>Account management</h1>
      <div className="Account-Management-count">
        <Status />
      </div>
      <div className="Account-Management-table">
        <table>
          <caption>List Student</caption>
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
            <tr>
              <td>1</td>
              <td>04/01/2016</td>
              <td>$1,190</td>
              <td>03/01/2016ds6</td>
              <td>03/01/2016ds6</td>
              <td>03/01/2016s</td>
              <td>
                <div className="select-change-role">
                  <select>
                    <option value="departmentmanager">
                      Department Manager
                    </option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="button-for-user">
                  <button>
                    <BsTrash />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagement;
