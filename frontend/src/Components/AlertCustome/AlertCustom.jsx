import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import trash from "../../images/trash.png";
import happy from "../../images/happy.png";
import {AiFillWarning} from "react-icons/ai";
import {FaRegSmileWink} from "react-icons/fa";

import "./style.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from "react-toastify";
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
              <img
                src="https://lh3.googleusercontent.com/Ya86bojSQtrjlwS1HQbJHV0rQhs8cLKqFl0SoLJcrhNUOA-UXGa3coA8ITz7xDikxX_kOQzKlmyaxMo-20TmDLgD589uwNqrU1BjPi6nFm6aFEhFQf39zTETgNyXu0b9vzGYibI0bSuzdp2vfn4aCfp1dC80DFexBpQRQBQaaPdgRT0eYt5pa5XAlOl4jmpneMrlEEyQFAQQkb1qJQTvf0_mG6Gw-PQv1PWQMbRdokTI1UWdhGK1-8_p2vBaK6RdK14xlI0cc6PbpQ0uerU4vRXUF511nXBu4hkEzzER3zFW-kxGIqfH45IRYbdsp134XCbVRe4u9wIJm3uhAgMIDXRFInjk3IPFWDAGfzEDjOmllRgT0r82uvOBEgOuoVzvy4imWVj5Tg6LPGpFvibcr66HZBVISMu0K_hLrz3z7jznxSs8cvXrBtDhNCjkTWLwC3HJBRmCIKfUEVmj8C_xfBtCQB0bMEc0rb8m_UWrNdggDsTjQQqiQz4EYqKlXNKIIcMorLRbRAMqFb-ItLyQNtZzYLydbBPQS7xz-qeZ5NLS60KSQpUqJMdAVcGrUOhqXkuVuexS-RzcgRYw6N1b-B56HZmVZjUlUwevMHzGlmoSRl9JLmtAVdUzl0SyioOlMKR7U68tV3hPPmec7DTkWojK3j-DXwq_pGgS6kXZwEjmc6fGYqUVXWvZ7Kt1rUJymPpIFKW9HXZK6d1r_9ew4VfniU7f2Bsz5D6ij3ZBA2KbPK6fShZv8tPqjPCLgXWt-x1LLjfgZkrjBvp5WF0k97jLs9mfO97n=s512-no?authuser=0"
                alt=""
              />
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
