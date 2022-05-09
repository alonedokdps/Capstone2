import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import "./style.scss";

// const items = ["graditent1", "graditent2", "graditent3", "graditent4"];
const Cardmini = ({data, eventType}) => {
  // const [color, setColor] = useState("");
  const getEventTypeFromId = (id) => {
    const event = eventType.filter((item) => item._id === id);
    return event;
  };
  const nameEventType = getEventTypeFromId(data.eventTypeId);
  // function random_color(items) {
  //   setColor(items[Math.floor(Math.random() * items.length)]);
  // }
  // useEffect(() => {
  //   random_color(items);
  //   console.log(color);
  // }, [color]);
  return (
    <Link className="card-mini-link" to={`/detail/${data._id}`}>
      <div className="card-m">
        <img src={`http://localhost:8000/${data.img}`} alt="" />
        <div className="card-m-info">
          <h4>{data.name}</h4>
          <span>
            <Moment format="DD/MM/YYYY">{data.dateOfEvent}</Moment>
          </span>
          <span>
            {nameEventType.length > 0 && nameEventType.map((item) => item.name)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Cardmini;
