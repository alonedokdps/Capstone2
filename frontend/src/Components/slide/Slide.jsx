import React from "react";
import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from "swiper";

import {Swiper, SwiperSlide} from "swiper/react";
import "./Slide.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
const Slide = ({data}) => {
  console.log(data);
  return (
    <div className="slide">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{delay: 1500}}
        navigation
        pagination={{clickable: true}}
        className="swiper"
      >
        {data.map((item) => (
          <SwiperSlide className="slide-item">
            <img src={`http://localhost:8000/${item.img}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;
