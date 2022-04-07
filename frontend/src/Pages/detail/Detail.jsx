import React from "react";
import {Link} from "react-router-dom";
import "./Detail.scss";
import {BsArrowLeft} from "react-icons/bs";
import CardInfo from "../../Components/card-info/CardInfo";
import About from "../../Components/About/About";

const Detail = () => {
  return (
    <div className="detail">
      <div className="back-btn">
        <Link to={-1}>
          <BsArrowLeft /> Back
        </Link>
      </div>
      <div
        className="overlay-detail"
        style={{
          backgroundImage: `url(
            "https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2020/01/03/B43D3D.jpg"
          )`,
        }}
      >
        <CardInfo />
      </div>
      <About />
    </div>
  );
};

export default Detail;
