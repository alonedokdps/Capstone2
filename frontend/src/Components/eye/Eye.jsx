import React from "react";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
const Eye = ({showPass, setShowPass}) => {
  const style = {color: "#bdc3c7"};
  return (
    <div className="eye" onClick={() => setShowPass(!showPass)}>
      {showPass ? (
        <AiFillEyeInvisible style={style} />
      ) : (
        <AiFillEye style={style} />
      )}
    </div>
  );
};

export default Eye;
