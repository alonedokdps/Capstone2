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

          {/* <img
            src="https://lh3.googleusercontent.com/mXOG3DRg1jDjxtWMcXG2yTg4M3vsschZkZn6zjT29gRzm4uqLTmNmf690ZJ9QJ4A9t3Nl44YtQTvghAfb4-7_nYWFuSz6ZJIT-u8oADomdUyKFmNiv8Hfo6I2oM5t4jhJKmCdehmkmGBufUT9AqOFRy8LwfYa9JDI1yC44hYsax7qqS9KGtjNx_GHtkQEMMnmx2_d8qNv04e5FbNuIb59j5A8YyP1A90WJnMhW547HP5BSkXYSzhbsqKGVXiIqmk7hLPqKynHQsrPpMcnrdjPH3Xm6nIzAO0tmGdkC495CpgiuNd-bsIHdsCc9wWSKLlHRtmQtHV5Zz6VzAMcxYNs8ClDzwokl6BaIzN-5HYA0SsmmNgOuZ2U4JNJ01OGfGkRBjEXUs2Me-Zm67GV-eIfiSr_mPvONJHnlIYAiDQbC8EpUoCVzfFN1KXTydOirfayeaKdawIxej9ONyC2Ocxa6MS-94z3QC5R9O_-jFtdpDT8FpmVKchkV_PU6rmh3G0nfrYN9wmFywWXGS5Jdhgae_mwBTNvSv0IEolmEUTVlytwUlDGinfk07TswVT1tuqxCdCFe1ZEcBlzMQBEuxYtwtW9hqxyrgg_tQXtisCZxzvS0YbdkzekRzVReihyFLb296XANjfTZaMr2784avvVAmTAoSl8nm-VEbp75cm8n53smjAB510HAhJ1SFjzJtmxh1TRmfOLGuaGFfyNeDtzqpiiIgZWgnZ3sFd6tC-jTtoCulL74j5G7mEC3QDOj_QzlW5HfH1yPULtAXxtn5jVL6bL79svLFq=s512-no?authuser=0"
            alt=""
          /> */}
          {/* <div className="alert-container-content-body-mess">abcd</div> */}
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
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default AlertCustom;
