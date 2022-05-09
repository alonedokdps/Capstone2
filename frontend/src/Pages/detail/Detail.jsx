import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./Detail.scss";
import {BsArrowLeft} from "react-icons/bs";
import CardInfo from "../../Components/card-info/CardInfo";
import About from "../../Components/About/About";
import ApiEventDetail from "../../api/Event.Detail.api";
import EventDetails from "../../Components/eventDetail/EventDetails";
import CountDown from "./../../Components/CountDown/CountDown";
import AOS from "aos";
import "aos/dist/aos.css";
const Detail = ({eventType}) => {
  const {id} = useParams();
  const [eventDetail, setEventDetail] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    ApiEventDetail.getEventDetal(id)
      .then((data) => {
        if (data) {
          const x = data.img.split("");
          const y = x.map((item, index) => {
            if (item === "\\") {
              item = "/";
            }
            return item;
          });
          setEventDetail({...data, img: y.join("")});
        }
      })
      .catch((err) => console.log(err));
    return () => {
      abortController.abort();
    };
  }, [id]);

  useEffect(() => {
    AOS.init();
  }, []);
  const getEventTypeFromId = (id) => {
    const event = eventType.filter((item) => item._id === id);
    return event;
  };
  const nameEventType = getEventTypeFromId(eventDetail.eventTypeId);
  return (
    <div className="detail-container">
      <div
        className="detail-event-background"
        style={{
          backgroundImage:
            "url(https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2022/03/28/BC8905.jpg)",
        }}
        data-aos="zoom-in"
      >
        <Link to="/" className="detail-event-btn-back-home">
          <BsArrowLeft />
        </Link>
        <div className="detail-event-background-overlay-filter">
          <div className="detail-event-background-overlay-filter-content">
            <div className="detail-event-background-overlay-filter-content-infomation">
              <div className="calendar-image">
                <p className="calendar-month">May</p>
                <p className="calendar-date">15</p>
                <p className="calendar-day">Sunday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
