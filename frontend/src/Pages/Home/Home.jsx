import React, {useEffect, useState} from "react";
import Card from "../../Components/Card/Card";
import Slide from "../../Components/slide/Slide";
import Title from "../../Components/Title/Title";
import "./Home.scss";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper";
import {EffectFade} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import getAllEventApi from "../../api/AllEvent.api";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Cardmini from "../../Components/cardSmall/Cardmini";
import AOS from "aos";
import "aos/dist/aos.css";
const Home = ({eventType, data}) => {
  const [num, setNum] = useState(5);
  const [featuredEvent, setFeaturedEvent] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    getAllEventApi.getAllEvent().then((data) => console.log("data", data));
    return () => {
      abortController.abort();
    };
  }, []);
  useEffect(() => {
    const abortController = new AbortController();
    getAllEventApi
      .getAllEvent()
      .then((data) => {
        if (data) {
          setFeaturedEvent(data);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      abortController.abort();
    };
  }, []);

  const resize = () => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        setNum(4);
        if (window.innerWidth < 600) {
          setNum(2);
        }
      } else {
        setNum(5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return function cleanupListener() {
      window.removeEventListener("scroll", handleScroll);
    };
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="section home  ">
      <Slide data={featuredEvent} />
      <Title title="New Event" />
      <div className="cardbox-row" data-aos="fade-up">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
          effect="Flip"
          spaceBetween={30}
          slidesPerView={num}
          navigation
          // pagination={{clickable: true}}
          // // scrollbar={{draggable: true}}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className="cardbox-row-slide"
        >
          <SwiperSlide>
            {" "}
            <Card />
          </SwiperSlide>
        </Swiper>
      </div>
      <Title
        title="Featured Events
"
      />
      <div className="cardbox-row-grid" data-aos="fade-up">
        {featuredEvent &&
          featuredEvent.length > 0 &&
          featuredEvent.map((item, index) => (
            <Cardmini eventType={eventType} data={item} />
          ))}
      </div>
    </div>
  );
};

export default Home;
