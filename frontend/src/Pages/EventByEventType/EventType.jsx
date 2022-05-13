import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import APIventByEventType from "../../api/EventByEventType.api";
import CardEventType from "../../Components/cardEventByType/CardEventType";
import CustomDrop from "../../Components/customDropwdownInput/CustomDrop";
import "./style.scss";
const EventType = ({category}) => {
  const {pathname} = useLocation();
  const [IdEventType, setIdEventType] = useState("");
  const [query, setQuery] = useState({eventid: "", getQuery: ""});
  const [getEventbyType, setGetEventByType] = useState([]);
  useEffect(() => {
    document.title = `Event${pathname}`;
    const getId = category.filter((item) => {
      if (item.name === pathname.split("/")[1]) {
        return item;
      }
    });
    if (getId) {
      setIdEventType(getId[0]._id);
    }
    APIventByEventType.EventByEventType(IdEventType, query.getQuery)
      .then((data) => {
        const dataEvent = data.data.map((item1) => {
          category.map((item2) => {
            if (item1.eventTypeId === item2._id) {
              item1.eventTypeId = item2.name;
            }
          });
          return item1;
        });

        setGetEventByType(dataEvent);
      })
      .catch((error) => console.log(error));
  }, [IdEventType, category, pathname, query]);

  return (
    <div className="section-event-type">
      <div className="filter-absolute">
        <div className="item-filter" data-value="get&month">
          get month
        </div>
        <div className="item-filter">get month</div>
        <CustomDrop />
        <CustomDrop />
      </div>
      <div className="title-and-filter">
        <div className="title-and-filter-t">
          <h4>{pathname.split("/")[1]}</h4>
          <span>
            Remember to register and attend the event on time! Thank you so much
          </span>
        </div>
        <div className="title-and-filter-f">
          <div className="item-filter" data-value={IdEventType}>
            All
          </div>
          <div className="item-filter" data-value="get&day">
            Today
          </div>
          <div className="item-filter" data-value="get&week">
            Week
          </div>
          <div className="item-filter" data-value="get&month">
            Month
          </div>
          <CustomDrop />
          <CustomDrop />
        </div>
      </div>
      <div className="grid-event-by-type">
        {getEventbyType && getEventbyType.length > 0 ? (
          getEventbyType.map((item) => {
            return <CardEventType data={item} />;
          })
        ) : (
          <div>No Event</div>
        )}
      </div>
    </div>
  );
};

export default EventType;
