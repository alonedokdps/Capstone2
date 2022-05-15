import React from "react";
import ReactDOM from "react-dom";
import QRCode from "qrcode.react";
import "./style.scss";
const Qrcode = ({open = false, handleClose = () => {}, value}) => {
  if (typeof document === "undefined") {
    return <div className="qrcode-container"></div>;
  }

  return ReactDOM.createPortal(
    <div className="qrcode-container">
      <div className="qrcode-container-overlay" onClick={handleClose}></div>
      <div className="qrcode-container-content">
        <QRCode size="200" value={value} renderAs="canvas" />,
        <div>Scan QR-code to attend</div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Qrcode;
