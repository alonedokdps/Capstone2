import React, {useEffect, useState} from "react";
import "./style.scss";
import {BsTools} from "react-icons/bs";
import {AiOutlineDropbox} from "react-icons/ai";
import {GrFormView} from "react-icons/gr";

import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from "react-dom";
import Circle from "../circle/Circle";

import ViewUser from "../ViewUser/ViewUser";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
const Table = ({
  open = false,
  handleClose = () => {},
  numberParticipants,
  user,
  name,
}) => {
  const [dataTable, setDataTable] = useState([]);
  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState();
  const getUserId = (id) => {
    setShow(true);
    setIdUser(id);
  };
  useEffect(() => {
    AOS.init();
    if (user && numberParticipants) {
      const numberPeople1 = user.filter((item1) => {
        const arr = [];
        numberParticipants.map((item2) => {
          arr.push(item2.accountId);
        });
        if (arr.includes(item1._id)) {
          return item1;
        }
      });
      const numberPeople2 = numberPeople1.map((item1) => {
        numberParticipants.map((item2) => {
          if (item1._id === item2.accountId) {
            item1.status = item2.isAttended;
          }
        });
        return item1;
      });
      console.log(numberPeople2);
      setDataTable(numberPeople2);
    }
  }, [user, numberParticipants]);
  if (typeof document === "undefined") {
    return <div className="table-container"></div>;
  }
  return ReactDOM.createPortal(
    <div className="table-container">
      {/* <div className="description-circle">
        <div>
          <Circle styleColor="green" />
          Attendance
        </div>
        <div>
          <Circle styleColor="orange" />
          Registered
        </div>
      </div> */}
      <div className="table-container-overlay" onClick={handleClose}></div>

      <div className="table-container-content" data-aos="zoom-in">
        <ReactHtmlTableToExcel
          id="test-table-xls-button"
          className="table-container-content-btn-export-table"
          table="table-to-xls"
          filename={name}
          sheet="tablexls"
          buttonText="Export to excel"
        />

        <table id="table-to-xls">
          <thead>
            <tr>
              <th>#</th>

              <th>Fullname</th>

              <th>Email</th>

              <th>Phone </th>

              <th>Department</th>

              <th>Course</th>
              <th>Class</th>
              <th>Score</th>
              <th>Status</th>
              <th>
                <BsTools />
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTable && dataTable.length > 0 ? (
              dataTable.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.departmentId}</td>
                    <td>{item.courseId}</td>
                    <td>{item.class}</td>
                    <th>{item.score}</th>
                    <td>
                      {item.status ? (
                        <>
                          {" "}
                          <Circle styleColor="green" /> Attendance
                        </>
                      ) : (
                        <>
                          {" "}
                          <Circle styleColor="orange" /> No attendance
                        </>
                      )}
                    </td>

                    <td>
                      <button onClick={() => getUserId(item._id)}>
                        <GrFormView style={{color: "white"}} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <div className="no-data-table">
                  <h1>
                    {" "}
                    <AiOutlineDropbox /> No Data
                  </h1>
                </div>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {show && <ViewUser setShow={setShow} idUser={idUser} />}
    </div>,
    document.querySelector("body")
  );
};

export default Table;
