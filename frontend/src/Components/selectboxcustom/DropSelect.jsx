import React, {useState} from "react";
import {useWatch} from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";
import "./style.scss";
const DropSelect = ({control, setValue, name, selectName, data}) => {
  console.log(data);
  const [label, setLabel] = useState(selectName);
  const {show, setShow, nodeRef} = useClickOutSide();
  const values = useWatch({
    control,
    name: "address",
    defaultValue: "",
  });
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setLabel(e.target.textContent);
    setShow(false);
  };
  return (
    <div className="select-dropdown" ref={nodeRef}>
      <div className="selectbox" onClick={() => setShow(!show)}>
        <span>{label}</span>
        <div className="selectbox-item">
          {show &&
            data.length > 0 &&
            data.map((item) => (
              <div
                className="select-x"
                key={item._id}
                onClick={handleClickDropdownItem}
                data-value={item._id}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DropSelect;
