import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import "./style.scss";
const Cardmini = ({data, eventType}) => {
  console.log("card mini", eventType);
  const getEventTypeFromId = (id) => {
    const event = eventType.filter((item) => item._id === id);
    return event;
  };
  const nameEventType = getEventTypeFromId(data.eventTypeId);
  console.log(nameEventType);
  return (
    <div className="card-m">
      <img src={`http://localhost:8000/${data.img}`} alt="" />
      <div className="card-m-info">
        <h4>
          <Link to={`/detail/${data._id}`}>{data.name}</Link>
        </h4>
        <span>
          <Moment format="DD/MM/YYYY">{data.dateOfEvent}</Moment>
        </span>
        <span>
          {nameEventType.length > 0 && nameEventType.map((item) => item.name)}
        </span>
      </div>
    </div>
  );
};

export default Cardmini;
