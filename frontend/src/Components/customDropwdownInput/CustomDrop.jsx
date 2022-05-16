import React from "react";
import "./style.scss";
import useClickOutSide from "../../hooks/useClickOutSide";

const CustomDrop = ({
  open = false,
  title,
  handleClose = () => {},
  data,
  handleQuery,
}) => {
  const {show, setShow, nodeRef} = useClickOutSide();

  return (
    <div className="select-typeshow" ref={nodeRef}>
      <div className="select-typeshow-selectbox" onClick={() => setShow(!show)}>
        {title}
        <div className="select-typeshow-selectbox-item">
          {show &&
            data &&
            data.map((item, index) => {
              return (
                <>
                  <div
                    key={item._id}
                    className="select-typeshow-selectbox-item-value"
                    data-value={item._id}
                    onClick={handleQuery}
                  >
                    {item.name}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CustomDrop;
