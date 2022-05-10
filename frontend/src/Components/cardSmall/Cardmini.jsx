import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import "./style.scss";

const Cardmini = ({data}) => {
  return (
    <Link className="card-mini-link" to={`/detail/${data._id}`}>
      <div className="card-m">
        <img src={`http://localhost:8000/${data.img}`} alt="" />
        <div className="card-m-info">
          <h4>{data.name}</h4>
          <span>
            <Moment format="DD/MM/YYYY">{data.dateOfEvent}</Moment>
          </span>
          <span>khoa hoc</span>
        </div>
      </div>
    </Link>
  );
};

export default Cardmini;
