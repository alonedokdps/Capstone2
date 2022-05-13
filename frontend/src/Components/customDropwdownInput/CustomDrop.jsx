import React, {useState} from "react";
import "./style.scss";
import useClickOutSide from "../../hooks/useClickOutSide";

const CustomDrop = ({get}) => {
  const {show, setShow, nodeRef} = useClickOutSide();

  return (
    <div className="select-typeshow" ref={nodeRef}>
      <div className="select-typeshow-selectbox" onClick={() => setShow(!show)}>
        offline
        <div className="select-typeshow-selectbox-item">
          {show && (
            <>
              {" "}
              <div
                className="select-typeshow-selectbox-item-value"
                data-value="sasas"
              >
                sasasaas
              </div>
              <div
                className="select-typeshow-selectbox-item-value"
                data-value="sasas"
              >
                sasasaas
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDrop;
