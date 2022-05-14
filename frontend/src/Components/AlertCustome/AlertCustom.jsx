import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import trash from "../../images/trash.png";
import happy from "../../images/happy.png";
import {AiFillWarning} from "react-icons/ai";
import {FaRegSmileWink} from "react-icons/fa";
import cry from "../../images/sad.png";
import "./style.scss";
import AOS from "aos";
import "aos/dist/aos.css";

const AlertCustom = ({
  handleClick,
  idEvent,
  handleClose,
  msg,
  diffId,

  title,
}) => {
  useEffect(() => {
    AOS.init();
  });
  const HandleClickOk = (id) => {
    handleClick(id);
    handleClose(false);
  };
  if (typeof document === "undefined") {
    return <div className="alert-container"></div>;
  }

  return ReactDOM.createPortal(
    <div className="alert-container">
      <div
        className="alert-container-overlay"
        onClick={() => handleClose(false)}
      ></div>
      <div className="alert-container-content" data-aos="zoom-in">
        {idEvent ? (
          <>
            <div className="alert-container-content-title">
              {title === "congratulations" && (
                <h1 className="congratulations">
                  <FaRegSmileWink />
                  congratulations
                </h1>
              )}
              {title === "warning" && (
                <h1 className="warning">
                  <AiFillWarning />
                  warning
                </h1>
              )}
            </div>
            <div className="alert-container-content-body">
              {title === "congratulations" ? (
                <img src={happy} alt="" />
              ) : (
                <img src={trash} alt="" />
              )}

              {title === "congratulations" ? (
                <div className="alert-container-content-body-msg">{msg}</div>
              ) : (
                <div className="alert-container-content-body-button">
                  <button
                    className="alert-container-content-body-button-cancel"
                    onClick={() => handleClose(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => HandleClickOk(idEvent)}
                    className="alert-container-content-body-button-ok"
                  >
                    Ok
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="alert-container-content-error">
            <div className="alert-container-content-error-msg">
              <strong>{diffId}</strong>
            </div>
            <div className="alert-container-content-error-img">
              <img src={cry} alt="" />
            </div>

            <button
              className="alert-container-content-error-btn"
              onClick={() => handleClose(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default AlertCustom;
