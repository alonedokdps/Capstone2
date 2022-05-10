import React from "react";
import {Link} from "react-router-dom";
import "./style.scss";

const NotfoundPage = () => {
  return (
    <div className="nofoundpage">
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default NotfoundPage;
