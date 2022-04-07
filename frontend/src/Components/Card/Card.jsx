import React from "react";
import Button from "../button/Button";
import "./Card.scss";
const Card = () => {
  return (
    <div className="card">
      <div className="img">
        <img
          src="https://images.tkbcdn.com/2/420/600/poster/ee289338-a5ac-11ec-a975-0242ac110002@webp"
          alt=""
        />
        <div className="hover-see-more">
          <Button
            buttonStyle="btn-primary"
            buttonSize="btn-xl"
            optionClass="transparent-btn"
          >
            See More
          </Button>
        </div>
      </div>
      <div className="info-event">
        <h4>NGHE SIEU DE</h4>
        <span>Ho chi Minh</span>
      </div>
    </div>
  );
};

export default Card;
