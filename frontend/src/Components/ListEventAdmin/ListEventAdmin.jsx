import React, {useEffect} from "react";
import Circle from "../circle/Circle";
import "./style.scss";

const ListEventAdmin = ({
  key,
  img,
  name,
  eventType,
  date,
  id,
  selectEvent,
  idEvent,
}) => {
  return (
    <div
      className={`list-event-admin ${id === idEvent ? "active" : ""}`}
      onClick={selectEvent}
      data-value={id}
    >
      <div
        className="list-event-admin-img"
        onClick={selectEvent}
        data-value={id}
      >
        <img src={`http://localhost:8000/${img}`} alt="img" />
      </div>
      <div className="list-event-admin-name">
        <h4>{name}</h4>
      </div>
      <div className="list-event-admin-category">
        <span>{eventType}</span>
      </div>
      <div className="list-event-admin-date">
        <span>{date}</span>
      </div>
      <Circle />
    </div>
  );
};

export default ListEventAdmin;
