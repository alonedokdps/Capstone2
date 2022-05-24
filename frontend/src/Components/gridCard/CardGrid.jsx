import React, {useEffect, useState} from "react";
import "./style.scss";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import {Link} from "react-router-dom";
const CardGrid = ({eventAccepted}) => {
  const [dataGrid, setDataGrid] = useState([]);
  useEffect(() => {
    if (eventAccepted) {
      const array = [...eventAccepted];
      const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
      const cutArr = shuffledArray.slice(0, 6);
      if (cutArr) {
        const newArr = cutArr.map((item1) => {
          if (item1.img) {
            const x = item1.img.split("");
            const y = x.map((item2, index) => {
              if (item2 === "\\") {
                item2 = "/";
              }
              return item2;
            });
            item1.img = y.join("");
          }
          return item1;
        });
        setDataGrid(newArr);
      }
    }
  }, [eventAccepted]);
  console.log("datagrid", dataGrid);

  return (
    <div className="wrapper">
      <div className="home-hero">
        <Link
          to={`/detail/${dataGrid[0]?._id}`}
          data-aos="flip-left"
          style={{
            backgroundImage: `url(http://localhost:8000/${dataGrid[0]?.img})`,
          }}
          className="feature"
        >
          <div>
            <h3>{dataGrid[0]?.name}</h3>
            <p>{dataGrid[0]?.address}</p>
          </div>
        </Link>
        <Link
          to={`/detail/${dataGrid[1]?._id}`}
          className="photos"
          style={{
            backgroundImage: `url(http://localhost:8000/${dataGrid[1]?.img})`,
          }}
          data-aos="flip-left"
        >
          <div>
            <h3>{dataGrid[1]?.name}</h3>
            <p>{dataGrid[1]?.address}</p>
          </div>
        </Link>
        <Link
          to={`/detail/${dataGrid[2]?._id}`}
          className="news"
          style={{
            backgroundImage: `url(http://localhost:8000/${dataGrid[2]?.img})`,
          }}
          data-aos="flip-left"
        >
          <div>
            <h3>{dataGrid[2]?.name}</h3>
            <p>{dataGrid[2]?.address}</p>
          </div>
        </Link>
        <Link
          to={`/detail/${dataGrid[3]?._id}`}
          className="special"
          style={{
            backgroundImage: `url(http://localhost:8000/${dataGrid[3]?.img})`,
          }}
          data-aos="flip-down"
        >
          <div>
            <h3>{dataGrid[3]?.name}</h3>
            <p>{dataGrid[3]?.address}</p>
          </div>
        </Link>
        <Link
          to={`/detail/${dataGrid[4]?._id}`}
          className="amazing"
          style={{
            backgroundImage: `url(http://localhost:8000/${dataGrid[4]?.img})`,
          }}
          data-aos="flip-down"
        >
          <div>
            <h3>{dataGrid[4]?.name}</h3>
            <p>{dataGrid[4]?.address}</p>
          </div>
        </Link>
        <Link
          to={`/detail/${dataGrid[5]?._id}`}
          className="cta"
          style={{
            backgroundImage: `url(http://localhost:8000/${dataGrid[5]?.img})`,
          }}
          data-aos="flip-left"
        >
          <div>
            <h3>{dataGrid[5]?.name}</h3>
            <p>{dataGrid[5]?.address}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardGrid;
