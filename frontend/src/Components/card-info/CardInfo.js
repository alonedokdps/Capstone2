import React from "react";
import Button from "../button/Button";
import {AiFillHeart} from "react-icons/ai";
import "./cardinfo.scss";
import Moment from "react-moment";
import {AiOutlineClockCircle} from "react-icons/ai";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {MdOutlineCategory} from "react-icons/md";

import {VscOrganization} from "react-icons/vsc";
const CardInfo = ({data, eventType}) => {
  return (
    <div className="info-event-detail">
      <div className="info-event-detail-img">
        <img src={`http://localhost:8000/${data.img}`} alt="" />
      </div>
      <div className="info-event-detail-text">
        <h3>{data.name}</h3>
        <span>
          <AiOutlineClockCircle />
          {data.timeStart}-
          <Moment format="DD/MM/YYYY">{data.dateOfEvent}</Moment>
        </span>
        <span>
          <HiOutlineLocationMarker />
          {data.address}
        </span>
        <span>
          <VscOrganization />
          {data.organizedBy}
        </span>

        <span>
          <MdOutlineCategory />
          {eventType.length > 0 && eventType.map((item) => item.name)}
        </span>

        <Button buttonStyle="btn-follow" buttonSize="btn-xl">
          <AiFillHeart />
          FOLLOW
        </Button>
      </div>
    </div>
  );
};

export default CardInfo;
