import React from "react";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper";
import data from "./data.js";
import {Swiper, SwiperSlide} from "swiper/react";
import "./Slide.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Slide = () => {
  console.log(data);
  return (
    <div className="slide">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{clickable: true}}
        className="swiper"
      >
        {data.map((item) => (
          <SwiperSlide className="slide-item">
            <img src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;
