import React from "react";
import Button from "../button/Button";
import {AiFillHeart} from "react-icons/ai";
import "./cardinfo.scss";
const CardInfo = () => {
  return (
    <div className="info-event-detail">
      <div className="info-event-detail-img">
        <img
          src="https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2020/01/03/B43D3D.jpg"
          alt=""
        />
      </div>
      <div className="info-event-detail-text">
        <h3>Nua Doi Huong Hoa Nguyet hue</h3>
        <span>17AM - nha hat trung vuong</span>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
          ut qui, nisi obcaecati voluptatum fugiat. Necessitatibus blanditiis ab
          saepe, maiores quisquam vero provident a, dolorem itaque consequatur
          animi, illo accusamus.
        </p>
        <Button buttonStyle="btn-follow" buttonSize="btn-xl">
          <AiFillHeart />
          FOLLOW
        </Button>
      </div>
    </div>
  );
};

export default CardInfo;
