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

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Cardmini from "../../Components/cardSmall/Cardmini";
import CardGrid from "../../Components/gridCard/CardGrid";

const Home = ({eventAccepted}) => {
  const [num, setNum] = useState(5);

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

  return (
    <div className="section home  ">
      <Slide data={eventAccepted} />
      <Title title="Random Event" />
      <CardGrid eventAccepted={eventAccepted} />
      <Title
        title="Featured Events
"
      />
      <div className="cardbox-row-grid">
        {eventAccepted &&
          eventAccepted.length > 0 &&
          eventAccepted.map((item) => {
            return <Cardmini data={item} />;
          })}
      </div>
    </div>
  );
};

export default Home;
