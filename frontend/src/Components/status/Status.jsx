import React from "react";
import {IoIosListBox} from "react-icons/io";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import {BsThreeDots} from "react-icons/bs";

import "./style.scss";
const style = ["style-1", "style-2", "style-3", "style-4"];

const Status = ({styleStatus, number, name, icon}) => {
  const checkStyle = style.includes(styleStatus) ? styleStatus : style[0];
  return (
    <div className={`status ${checkStyle}`}>
      <div className="row-status-1">
        <h4>{name}</h4>
        <p>{number ? number : 0}</p>
      </div>
      {icon === "total" && (
        <IoIosListBox style={{fontSize: "40px", color: "white"}} />
      )}
      {icon === "accept" && (
        <AiFillCheckCircle style={{fontSize: "40px", color: "white"}} />
      )}
      {icon === "pending" && (
        <BsThreeDots style={{fontSize: "40px", color: "white"}} />
      )}
      {icon === "rejected" && (
        <AiFillCloseCircle style={{fontSize: "40px", color: "white"}} />
      )}
    </div>
  );
};

export default Status;
