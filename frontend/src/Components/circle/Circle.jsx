import React from "react";
import "./style.scss";
const style = ["red", "orange", "green", "grey"];
const Circle = ({styleColor}) => {
  const checkStyle = style.includes(styleColor) ? styleColor : style[0];
  return <div className={`circle ${checkStyle}`}></div>;
};

export default Circle;
