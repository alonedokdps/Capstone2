import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./Detail.scss";
import {CalendarComponent} from "@syncfusion/ej2-react-calendars";
import {BsArrowLeft} from "react-icons/bs";
import {ImLocation} from "react-icons/im";
import {BiTimeFive} from "react-icons/bi";

import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

import {
  AiOutlineCheckCircle,
  AiOutlineQrcode,
  AiOutlineStar,
  AiFillStar,
  AiFillCheckCircle,
} from "react-icons/ai";
import {MdOutlineDoNotDisturb} from "react-icons/md";

import ApiEventDetail from "../../api/Event.Detail.api";
import ApiRegistrationEvent from "../../api/RegisTrationEvent.api";

import CountDown from "./../../Components/CountDown/CountDown";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../../Components/button/Button";
import Moment from "react-moment";
import APIGetRegister from "./../../api/GetRegister.api";
import {toast} from "react-toastify";
import ApiCheckRegisterOrAttend from "../../api/CheckRegisterOrAttend.api";
import AlertCustom from "../../Components/AlertCustome/AlertCustom";
import apigetRegisteredOfEvent from "../../api/getRegisteredOfEvent.api";
import ApiAttend from "../../api/AttendEvent.api";
import ApiUpdateScore from "../../api/UpdateScore.api";
import Qrcode from "./../../Components/qr-code/Qrcode";
const Detail = ({
  category,
  updateStatus,
  setUpdateStatus,
  showPoint,
  setshowPoint,
}) => {
  const {id} = useParams();
  const [eventDetail, setEventDetail] = useState([]);
  const [showDetail, setShowDetail] = useState(0);
  const [numberRegister, setNumberRegister] = useState(0);
  const [isRegister, setIsRegister] = useState(0);
  const [check, setCheck] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const dateValue = new Date(eventDetail.dateOfEvent);
  const [warning, setWarning] = useState(false);
  const [idParticipant, setIdParticipants] = useState("");
  const [alertAttended, setAlertAttended] = useState(false);
  const [showQr, setShowQr] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) return;
    const newUser = JSON.parse(user);
    if (eventDetail._id && idParticipant) {
      const newUser2 = {
        ...newUser,
        idevent: eventDetail._id,
        idPar: idParticipant,
      };
      localStorage.setItem("Qrcode", JSON.stringify(newUser2));
    }
    return () => localStorage.removeItem("Qrcode");
  }, [eventDetail._id, idParticipant, id]);
  const openViewDetail = () => {
    if (showDetail == 2) {
      setShowDetail(0);
      return;
    }
    setShowDetail((prev) => prev + 1);
  };

  const handleAttend = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    ApiAttend.AttendEvent(id, idParticipant).then((data) => {
      if (data.success === true) {
        setIsRegister(isRegister + 1);
        setUpdateStatus(updateStatus + 1);
        ApiUpdateScore.UpdateScore(userData?.id).then((data) =>
          console.log(data)
        );
        toast(data.message);
        setshowPoint(true);
      } else {
        toast.info(data.message);
      }
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const userData = JSON.parse(localStorage.getItem("user"));
    APIGetRegister.GetRegister(id).then((data) => {
      if (data) {
        console.log(data?.length);
        setNumberRegister(data?.length);
      } else {
        setNumberRegister(0);
      }
    });

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
          document.title = data.name;
          setEventDetail({
            ...data,
            eventTypeId: nameEventype[0]?.name,
            img: y.join(""),
          });
        }
      })
      .catch((err) => console.log(err));
    if (!userData) return toast("Hi! To register, please login!");

    const idAcc = userData.id && userData.id;
    if (userData) {
      apigetRegisteredOfEvent.getRegisteredOfEvent(id, idAcc).then((data) => {
        if (data && data.length > 0) {
          setIdParticipants(data[0]?._id);
        } else {
          setIdParticipants("");
        }
      });
      ApiCheckRegisterOrAttend.CheckRegisterOrAttend(id, idAcc)
        .then((data) => {
          if (data) {
            setCheck(data);
          }
        })
        .catch((err) => console.log(err));
    }

    return () => {
      abortController.abort();
      document.title = "DEVENT";
    };
  }, [category, id, isRegister]);
  const handleRegister = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && eventDetail) {
      const data = {
        Username: userData.name,
        accountId: userData.id,
        eventId: id,
      };
      ApiRegistrationEvent.RegistrationEvent(data).then((data) => {
        if (data.Data_QR) {
          // console.log("data.Data_QR", data.Data_QR);
          toast(data.Data_QR.message);
          setUpdateStatus(updateStatus + 1);
          setIsRegister(isRegister + 1);
        } else {
          toast.error(data.message);
        }
      });
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);
  const checkEventWhenAllowAttend = () => {
    if (eventDetail.allow === true && check === "You are not registered") {
      setWarning(true);
    }
  };
  return (
    <>
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
                      <BiTimeFive
                        style={{cursor: "pointer"}}
                        onClick={() => setShowCountDown(true)}
                      />{" "}
                      {eventDetail.timeStart} - {eventDetail.timeEnd}
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
                    <div
                      className={`detail-event-background-overlay-filter-content-infomation-dexv1-peoples-participant-1 ${
                        numberRegister === eventDetail.seat && "disable"
                      }`}
                    >
                      <div
                        className={`detail-event-background-overlay-filter-content-infomation-dexv1-peoples-participant-1-2 ${
                          numberRegister === eventDetail.seat && "disable"
                        }`}
                      >
                        <div
                          className={`detail-event-background-overlay-filter-content-infomation-dexv1-peoples-participant-1-2-3 ${
                            numberRegister === eventDetail.seat && "disable"
                          } `}
                        >
                          <div className="number-seat">
                            <h4>
                              {numberRegister === eventDetail.seat
                                ? "Maximum"
                                : eventDetail.seat !== null
                                ? `${numberRegister}/${eventDetail.seat}`
                                : eventDetail.seat === null && numberRegister}
                            </h4>
                            <span>number of seats</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {numberRegister === eventDetail.seat &&
                    check === "You are not registered" ? (
                      <Button buttonStyle="btn-cant-register">
                        <MdOutlineDoNotDisturb /> Can't register
                      </Button>
                    ) : check === "You are not registered" &&
                      eventDetail.allow === false ? (
                      <Button
                        buttonStyle="btn-registerV2"
                        onClick={handleRegister}
                      >
                        <AiOutlineCheckCircle /> Register
                      </Button>
                    ) : check === "You are not registered" &&
                      eventDetail.allow === true ? (
                      <Button
                        buttonStyle="btn-registerV2"
                        onClick={
                          eventDetail.allow === true &&
                          check === "You are not registered"
                            ? checkEventWhenAllowAttend
                            : handleRegister
                        }
                      >
                        <AiOutlineCheckCircle /> Register
                      </Button>
                    ) : check === "registered" &&
                      eventDetail.allow === false ? (
                      <Button
                        buttonStyle="btn-registerV2-success"
                        onClick={handleRegister}
                      >
                        <AiFillCheckCircle /> Registered
                      </Button>
                    ) : check === "registered" && eventDetail.allow === true ? (
                      <div className="button-attend-gruop">
                        <Button
                          onClick={handleAttend}
                          buttonStyle="btn-attendV2-success"
                        >
                          <AiOutlineStar /> Attendance
                        </Button>
                        <AiOutlineQrcode
                          onClick={() => setShowQr(true)}
                          className="icon-qrcode"
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    ) : check === "attended" ? (
                      <div className="button-attend-gruop">
                        <Button
                          onClick={() => setAlertAttended(true)}
                          buttonStyle="btn-attendV2-fail"
                        >
                          <AiFillStar /> Attended
                        </Button>

                        <AiOutlineQrcode
                          onClick={
                            check === "attended"
                              ? () => setAlertAttended(true)
                              : () => setShowQr(true)
                          }
                          className="icon-qrcode"
                          style={{fontSize: "20px", cursor: "pointer"}}
                        />
                      </div>
                    ) : (
                      ""
                    )}
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
      {alertAttended && (
        <AlertCustom
          handleClose={setAlertAttended}
          title="warning"
          diffId="you already took attendance :v"
        />
      )}
      {warning && (
        <AlertCustom
          handleClose={setWarning}
          title="warning"
          diffId="Sorry, the event is in attendance status, you cannot register for this event :("
        />
      )}
      {showPoint && (
        <AlertCustom
          handleClose={setshowPoint}
          idEvent={id}
          title="congratulations"
          msg="You get 5 points for training points
  "
        />
      )}
      {showQr && (
        <Qrcode
          value={"http://localhost:3000/Qrprocess"}
          handleClose={() => setShowQr(false)}
        />
      )}
      {showCountDown && (
        <CountDown
          date={eventDetail.dateOfEvent}
          handleClose={() => setShowCountDown(false)}
        />
      )}
    </>
  );
};

export default Detail;
