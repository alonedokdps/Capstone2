import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Analyze from "../../Components/AnalyzeEvent/Analyze";
import ListEventAdmin from "../../Components/ListEventAdmin/ListEventAdmin";
import Status from "../../Components/status/Status";
import {AiOutlineDropbox} from "react-icons/ai";

import "./EventUser.scss";
import AOS from "aos";
import "aos/dist/aos.css";
const EventUser = ({
  totalEvent,
  user,
  handleChangeFilter,
  updateStatus,
  count,
  pending,
  accept,
  active,
  handleDeleteEvent,
  idEvent,
  numberParticipants,
  reject,
  selectEvent,
  UpdateStatusEvent,
  updateAllow,
  checked,
  setChecked,
}) => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="event-user">
      <h1 data-aos="fade-right">Events</h1>
      <div className="event-status">
        {/* <h4>Activities</h4> */}
        <div className="event-status-box" data-aos="zoom-in">
          <Status
            styleStatus="style-1"
            name="Total Event"
            number={count.length}
          />
          <Status styleStatus="style-2" name="Approved" number={accept} />
          <Status styleStatus="style-3" name="Pending" number={pending} />
          <Status styleStatus="style-4" name="Rejected" number={reject} />
        </div>
        <div className="event-management">
          <div className="event-management-box">
            <div className="event-management-box-row1" data-aos="fade-right">
              <div className="tabs1">
                <div
                  className={`tab-item ${active === 1 ? "active" : ""} `}
                  data-value={""}
                  onClick={handleChangeFilter}
                >
                  All
                </div>
                <div
                  className={`tab-item ${active === 2 ? "active" : ""} `}
                  data-value={"Accept"}
                  onClick={handleChangeFilter}
                >
                  Approved
                </div>
                <div
                  className={`tab-item ${active === 3 ? "active" : ""} `}
                  data-value={"Pending"}
                  onClick={handleChangeFilter}
                >
                  Pending
                </div>
                <div
                  className={`tab-item ${active === 4 ? "active" : ""} `}
                  data-value={"Reject"}
                  onClick={handleChangeFilter}
                >
                  Rejected
                </div>
                <div
                  className={`tab-item ${active === 5 ? "active" : ""} `}
                  data-value={"Expired"}
                  onClick={handleChangeFilter}
                >
                  Expired
                </div>
                <div
                  className={`tab-item ${active === 6 ? "active" : ""} `}
                  data-value={"Deleted"}
                  onClick={handleChangeFilter}
                >
                  Deleted
                </div>
              </div>
              <div className="event-management-box-row1-container">
                {totalEvent && totalEvent.length > 0 ? (
                  totalEvent.map((item, index) => {
                    return (
                      <>
                        <ListEventAdmin
                          key={item._id}
                          idEvent={idEvent}
                          id={item._id}
                          img={item.img}
                          name={item.name}
                          eventType={item.eventTypeId}
                          date={item.dateOfEvent}
                          status={item.status}
                          selectEvent={selectEvent}
                        />
                      </>
                    );
                  })
                ) : (
                  <>
                    <div className="No-data">
                      <h4>
                        <AiOutlineDropbox />
                        No Data
                      </h4>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="event-management-box-row2" data-aos="fade-left">
              <Analyze
                user={user}
                setChecked={setChecked}
                numberParticipants={numberParticipants}
                handleDeleteEvent={handleDeleteEvent}
                idEvent={idEvent}
                updateStatus={updateStatus}
                UpdateStatusEvent={UpdateStatusEvent}
                updateAllow={updateAllow}
                checked={checked}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventUser;
