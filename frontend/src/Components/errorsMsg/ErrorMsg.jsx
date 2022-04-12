import React from "react";
import "./errorMsg.scss";
import {MdError} from "react-icons/md";
const ErrorMsg = ({children}) => {
  return (
    <div className="handleError">
      <MdError /> {children}
    </div>
  );
};

export default ErrorMsg;
