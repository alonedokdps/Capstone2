import React from "react";
import "./Button.scss";
const STYLES = [
  "btb-outline",
  "btn-primary",
  "btn-follow",
  "btn-attend-success",
  "btn-attend",
  "btn-follow-register",
  "btn-login",
  "btn-register",
  "btn-clear",
  "btn-registerV2",
  "btn-attendV2",
  "btn-registerV2-success",
  "btn-attendV2-success",
  "btn-registerV2-fail",
  "btn-attendV2-fail",
];
const SIZES = ["btn-xs", "btn-s", "btn-m", "btn-l", "btn-xl"];

const Button = ({
  buttonStyle,
  buttonSize,
  onClick,
  type,
  optionClass,
  children,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkOptionClass = optionClass && optionClass;
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkOptionClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
