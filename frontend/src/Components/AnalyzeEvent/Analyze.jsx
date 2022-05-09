import React, {useEffect, useState} from "react";
import Circle from "../circle/Circle";
import "./style.scss";
import {MdOutlineEmojiPeople, MdListAlt} from "react-icons/md";
import {FiTool, FiTrash2} from "react-icons/fi";
import ApiEventDetail from "../../api/Event.Detail.api";
import AOS from "aos";
import "aos/dist/aos.css";
import Table from "../tableComponent/Table";
import AlertCustom from "../AlertCustome/AlertCustom";
const Analyze = ({
  numberParticipants,
  user,
  handleDeleteEvent,
  idEvent,
  UpdateStatusEvent,
}) => {
  const [getStatus, setStatus] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    if (idEvent) {
      ApiEventDetail.getEventDetal(idEvent).then((res) => {
        if (res) {
          setStatus(res.status);
          setName(res.name);
        } else {
          setStatus("");
          setName("");
        }
      });
    } else {
      setStatus("");
    }
    return () => {
      abortController.abort();
    };
  }, [idEvent]);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    AOS.init();
  });
  const showAlertDelete = () => {
    setShowAlert(true);
  };
  return (
    <>
      <div className="analyze-event">
        <div className="analyze-event-status">
          <div className="analyze-event-status-edit">
            <FiTool />
          </div>

          <form className="analyze-event-status-form">
            {getStatus === "Pending" ? (
              <>
                <Circle styleColor="orange" />
              </>
            ) : getStatus === "Accept" ? (
              <>
                <Circle styleColor="green" />
              </>
            ) : getStatus === "Reject" ? (
              <>
                <Circle styleColor="red" />
              </>
            ) : (
              getStatus === "" && (
                <>
                  <Circle styleColor="grey" />
                </>
              )
            )}
            <select value={getStatus} onChange={UpdateStatusEvent}>
              <option value="">none</option>
              <option value="Accept">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Reject">Rejected</option>
            </select>
          </form>
          <div
            className="analyze-event-status-remove"
            onClick={showAlertDelete}
          >
            <FiTrash2 />
          </div>
        </div>
        <div className="analyze-event-participant1">
          <div
            className={
              !idEvent && getStatus === ""
                ? "analyze-event-participant1-2 active"
                : "analyze-event-participant1-2"
            }
          >
            <div
              className={
                !idEvent && getStatus === ""
                  ? "analyze-event-participant1-2-3 active"
                  : "analyze-event-participant1-2-3"
              }
            >
              <div className="analyze-event-participant1-2-3-number">
                <h1>
                  {!idEvent && getStatus === "" ? (
                    <>
                      <div className="circle-loading2">
                        <div></div>
                        <div></div>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      {numberParticipants.length} <MdOutlineEmojiPeople />
                    </>
                  )}
                </h1>
                {!idEvent && getStatus === "" ? (
                  ""
                ) : (
                  <span>Number of participants</span>
                )}
              </div>
              <div
                onClick={() => setOpen(true)}
                className={
                  !idEvent ||
                  numberParticipants.length === 0 ||
                  getStatus === ""
                    ? `view-list-participants none `
                    : `view-list-participants`
                }
              >
                <h4>
                  View <MdListAlt />
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Table
          user={user}
          open={open}
          numberParticipants={numberParticipants}
          handleClose={handleClose}
          name={name}
        />
      )}
      {showAlert && (
        <AlertCustom
          handleClick={handleDeleteEvent}
          idEvent={idEvent}
          handleClose={setShowAlert}
        />
      )}
    </>
  );
};

export default Analyze;
