import React from "react";
import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from "swiper";

import {BsWifiOff, BsWifi} from "react-icons/bs";
import {Swiper, SwiperSlide} from "swiper/react";
import "./Slide.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import {Link} from "react-router-dom";
import Moment from "react-moment";
const Slide = ({data}) => {
  return (
    <div className="slide" data-aos="zoom-in">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{delay: 2500}}
        navigation
        pagination={{clickable: true}}
        className="swiper"
      >
        {data.map((item) => (
          <SwiperSlide className="slide-item">
            <Link className="slide-item-link" to={`detail/${item._id}`}>
              <div className="swiper-slide-item-overlay">
                <img src={`http://localhost:8000/${item.img}`} />
                <div className="swiper-slide-item-overlay-info">
                  <h1>{item.name}</h1>
                  <h4>{item.address}</h4>
                  <h4>
                    <Moment format="DD/MM/YYYY" withTitle>
                      {item.dateOfEvent}
                    </Moment>
                  </h4>
                </div>
                <span>
                  {item.online ? (
                    <>
                      <BsWifi />
                      Online
                    </>
                  ) : (
                    <>
                      <BsWifiOff />
                      Offline
                    </>
                  )}
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;
