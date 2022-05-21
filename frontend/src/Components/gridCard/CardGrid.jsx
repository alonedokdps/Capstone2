import React from "react";
import "./style.scss";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
const CardGrid = () => {
  return (
    <div className="wrapper">
      <div className="home-hero">
        <div data-aos="flip-left" className="feature">
          <h3>Special Shapes</h3>
          <p>Why are some of them so scary looking?</p>
        </div>
        <div className="photos" data-aos="flip-left">
          <h3>Special Shapes</h3>
          <p>Why are some of them so scary looking?</p>
        </div>
        <div className="news" data-aos="flip-left">
          <h3>10 things you discover when taking a balloon ride.</h3>
          <p>Number 8 will AMAZE you.</p>
        </div>
        <div className="special" data-aos="flip-down">
          <h3>Angry people at balloon fiestas</h3>
          <p>Hot air balloons. A bit weather sensitive. </p>
        </div>
        <div className="amazing" data-aos="flip-down">
          <h3>Balloon photos</h3>
          <p>I have quite a few.</p>
        </div>
        <div className="cta" data-aos="flip-left">
          <p>Sign up for more information about balloons. </p>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
