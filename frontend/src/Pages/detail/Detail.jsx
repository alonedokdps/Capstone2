import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./Detail.scss";
import {BsArrowLeft} from "react-icons/bs";
import CardInfo from "../../Components/card-info/CardInfo";
import About from "../../Components/About/About";
import ApiEventDetail from "../../api/Event.Detail.api";
import EventDetails from "../../Components/eventDetail/EventDetails";

const Detail = ({eventType}) => {
  const {id} = useParams();
  const [eventDetail, setEventDetail] = useState([]);
  // useEffect(() => {
  //   ApiEventDetail.getEventDetal(id)
  //     .then((data) => {
  //       if (data) {
  //         setEventDetail(data);
  //         console.log(data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  const getEventTypeFromId = (id) => {
    const event = eventType.filter((item) => item._id === id);
    return event;
  };
  const nameEventType = getEventTypeFromId(eventDetail.eventTypeId);
  return (
    <div className="detail">
      <div className="back-btn">
        <Link to={-1}>
          <BsArrowLeft /> Back
        </Link>
      </div>
      <div
        className="overlay-detail"
        style={{
          backgroundImage: `url(http://localhost:8000/${eventDetail.img}
          )`,
        }}
      >
        <CardInfo eventType={nameEventType} data={eventDetail} />
      </div>
      <About data={eventDetail} />
    </div>
  );
};

export default Detail;
