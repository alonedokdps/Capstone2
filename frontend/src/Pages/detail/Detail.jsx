import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./Detail.scss";
import {CalendarComponent} from "@syncfusion/ej2-react-calendars";
import {BsArrowLeft} from "react-icons/bs";
import {ImLocation} from "react-icons/im";
import {BiTimeFive} from "react-icons/bi";
import {FaAudioDescription} from "react-icons/fa";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

import CardInfo from "../../Components/card-info/CardInfo";
import About from "../../Components/About/About";
import ApiEventDetail from "../../api/Event.Detail.api";
import EventDetails from "../../Components/eventDetail/EventDetails";
import CountDown from "./../../Components/CountDown/CountDown";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../../Components/button/Button";
import Moment from "react-moment";
const Detail = ({category}) => {
  const {id} = useParams();
  const [eventDetail, setEventDetail] = useState([]);
  const [showDetail, setShowDetail] = useState(0);
  const dateValue = new Date(eventDetail.dateOfEvent);

  const openViewDetail = () => {
    if (showDetail == 2) {
      setShowDetail(0);
      return;
    }
    setShowDetail((prev) => prev + 1);
  };
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
          const nameEventype = category.filter(
            (item) => item._id === data.eventTypeId
          );

          setEventDetail({
            ...data,
            eventTypeId: nameEventype[0].name,
            img: y.join(""),
          });
        }
      })
      .catch((err) => console.log(err));
    return () => {
      abortController.abort();
    };
  }, [category, id]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="detail-container">
      <div
        className="detail-event-background"
        style={{
          backgroundImage: `url(http://localhost:8000/${eventDetail.img})`,
        }}
      >
        <Link
          to="/"
          className={
            !showDetail == 0
              ? "detail-event-btn-back-home active"
              : "detail-event-btn-back-home"
          }
        >
          <BsArrowLeft />
        </Link>
        <div className="detail-event-background-overlay-filter">
          <div
            className={
              !showDetail == 0
                ? "detail-event-background-overlay-filter-content active"
                : "detail-event-background-overlay-filter-content"
            }
          >
            <div
              className={
                !showDetail == 0
                  ? "detail-event-background-overlay-filter-content-infomation active"
                  : "detail-event-background-overlay-filter-content-infomation"
              }
            >
              <div className="detail-event-background-overlay-filter-content-infomation-dexv1">
                <div
                  className="detail-event-background-overlay-filter-content-infomation-dexv1-calendar"
                  data-aos="fade-right"
                >
                  <CalendarComponent value={dateValue}></CalendarComponent>
                </div>
                <div
                  className="detail-event-background-overlay-filter-content-infomation-dexv1-text"
                  data-aos="fade-down"
                >
                  <h4>{eventDetail.name}</h4>
                  <span>
                    <BiTimeFive /> {eventDetail.timeStart} -{" "}
                    {eventDetail.timeEnd}
                  </span>
                  <span>
                    <ImLocation />
                    {eventDetail.address}
                  </span>

                  {eventDetail.description && (
                    <p>
                      {eventDetail.description.slice(0, 200)}
                      <span onClick={openViewDetail}>...view more</span>
                    </p>
                  )}
                </div>
                <div
                  className="detail-event-background-overlay-filter-content-infomation-dexv1-peoples-participant"
                  data-aos="fade-left"
                >
                  <div className="detail-event-background-overlay-filter-content-infomation-dexv1-peoples-participant-1">
                    <div className="detail-event-background-overlay-filter-content-infomation-dexv1-peoples-participant-1-2">
                      <div className="detail-event-background-overlay-filter-content-infomation-dexv1-peoples-participant-1-2-3"></div>
                    </div>
                  </div>
                  <Button buttonStyle="btn-registerV2">Register</Button>
                </div>
              </div>

              {!showDetail == 0 && (
                <div className="dexv2 " data-aos="fade-down">
                  <h4>About</h4>
                  <div className="dexv2-about">
                    <div className="dexv2-about-field">
                      <h5>Name:</h5>
                      <p>{eventDetail.name}</p>
                    </div>
                    <div className="dexv2-about-field">
                      <h5>Organized by:</h5>
                      <p>{eventDetail.organizedBy}</p>
                    </div>
                    <div className="dexv2-about-field">
                      <h5>Category:</h5>
                      <p>{eventDetail.eventTypeId}</p>
                    </div>
                    <div className="dexv2-about-field">
                      <h5>Time:</h5>
                      <p>
                        {
                          <Moment format="DD/MM/YYYY">
                            {eventDetail.dateOfEvent}
                          </Moment>
                        }
                      </p>{" "}
                      <p>
                        ( {eventDetail.timeStart} - {eventDetail.timeEnd})
                      </p>
                    </div>
                    <div className="dexv2-about-field">
                      <h5>Address:</h5>
                      <p>{eventDetail.address}</p>
                    </div>
                    <div className="dexv2-about-field">
                      <h5>Seat:</h5>
                      <p>{eventDetail.seat}</p>
                    </div>
                    <div className="dexv2-about-description">
                      <div className="dexv2-about-description-title">
                        <h5>{eventDetail.name}</h5>
                      </div>
                      <p>{eventDetail.description}</p>
                      {showDetail == 2 && (
                        <div
                          className="dexv2-about-description-detailevent"
                          data-aos="fade-down"
                        >
                          <h4>Event Detail</h4>
                          {eventDetail.details &&
                          eventDetail.details.length > 0 ? (
                            eventDetail.details.map((item, index) => {
                              return (
                                <>
                                  <div
                                    className="dexv2-about-description-detailevent-item"
                                    key={item._id}
                                  >
                                    <h5>
                                      {item.nameD}{" "}
                                      {`(${item.timeStart} - ${item.timeEnd})`}
                                    </h5>
                                    <p>{item.descriptionD}</p>
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <div className="dexv2-about-description-detailevent-nonedata">
                              Not Event detail
                            </div>
                          )}
                        </div>
                      )}

                      {/* {showDetail == 2 && (
                        <div
                          className="dexv2-about-description-detailevent"
                          data-aos="fade-down"
                        >
                          <h4>Event Detail</h4>
                          <div className="dexv2-about-description-detailevent-item">
                            <h5>
                              Frist Sesstion:số ghế đến quý khách qua email hoặc
                              Zalo (7:00 - 9:00){" "}
                            </h5>
                            <p>
                              {" "}
                              lễ, thứ 7, CN), BTC sẽ chủ động sắp xếp chỗ ngồi
                              cho quý khách theo sơ đồ và thứ tự ưu tiên đặt
                              chỗ. BTC sẽ gửi số ghế đến quý khách qua email
                              hoặc Zalo. Trong trường hợp đặt vé sát ngày diễn
                              ra show, BTC sẽ gửi số ghế sớm nhất có thể cho quý
                              khách Sơ đồ chỗ ngồi:
                            </p>
                          </div>
                          <div className="dexv2-about-description-detailevent-item">
                            <h5>
                              Frist Sesstion:số ghế đến quý khách qua email hoặc
                              Zalo (7:00 - 9:00){" "}
                            </h5>
                            <p>
                              {" "}
                              lễ, thứ 7, CN), BTC sẽ chủ động sắp xếp chỗ ngồi
                              cho quý khách theo sơ đồ và thứ tự ưu tiên đặt
                              chỗ. BTC sẽ gửi số ghế đến quý khách qua email
                              hoặc Zalo. Trong trường hợp đặt vé sát ngày diễn
                              ra show, BTC sẽ gửi số ghế sớm nhất có thể cho quý
                              khách Sơ đồ chỗ ngồi:
                            </p>
                          </div>
                        </div>
                      )} */}
                      <div
                        className="dexv2-about-description-viewDetail"
                        onClick={openViewDetail}
                      >
                        <span>
                          {showDetail == 1 ? (
                            <IoIosArrowDown />
                          ) : showDetail == 2 ? (
                            <IoIosArrowUp />
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
