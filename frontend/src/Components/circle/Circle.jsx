import React from "react";
import "./style.scss";
const style = ["red", "orange", "green", "grey"];
const Circle = ({styleColor, status}) => {
  const checkStyle = style.includes(styleColor) ? styleColor : style[0];
  return (
    <div
      className={`circle ${checkStyle} ${
        status && status === "Pending"
          ? "isPending"
          : status === "Accept"
          ? "isAccept"
          : !status
          ? ""
          : "isRejected"
      }`}
    ></div>
  );
};

export default Circle;
