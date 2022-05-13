import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import "./style.scss";

const CardEventType = ({data}) => {
  return (
    <div className="card-event-type">
      <Link to={`/detail/${data._id}`}>
        <div className="card-event-type-img">
          <img src={`http://localhost:8000/${data.img}`} alt="" />
        </div>
        <div className="card-event-type-info">
          <h4>{data.name}</h4>
          <span>
            {" "}
            <Moment format="DD/MM/YYYY">{data.dateOfEvent}</Moment>
          </span>
          <span>{data.eventTypeId}</span>
        </div>
      </Link>
    </div>
  );
};

export default CardEventType;
