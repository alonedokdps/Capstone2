import React from "react";
import Circle from "../circle/Circle";
import "./style.scss";
const style = ["style-1", "style-2", "style-3", "style-4"];
const Status = ({styleStatus, number, name}) => {
  const checkStyle = style.includes(styleStatus) ? styleStatus : style[0];
  return (
    <div className={`status ${checkStyle}`}>
      <h4>{name}</h4>
      <p>{number}</p>
      <Circle />
    </div>
  );
};

export default Status;
