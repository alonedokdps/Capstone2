import React from "react";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
const Eye = ({showPass, setShowPass}) => {
  const style = {color: "white", fontSize: "13px"};
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
