import React from "react";
import {AiOutlineHome} from "react-icons/ai";
import {Link} from "react-router-dom";
import "./style.scss";
const HomeButton = () => {
  const style = {color: "#fff", fontSize: "20px", fontWeight: "bold"};
  return (
    <Link to="/" className="btn-return-home">
      <AiOutlineHome style={style} />
    </Link>
  );
};

export default HomeButton;
