import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {
  AiOutlineCheckCircle,
  AiOutlineQrcode,
  AiFillCheckCircle,
} from "react-icons/ai";

import "./cardinfo.scss";
import Moment from "react-moment";
import {AiOutlineClockCircle, AiFillStar, AiOutlineStar} from "react-icons/ai";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {MdOutlineCategory} from "react-icons/md";
import {toast} from "react-toastify";
import ApiRegistrationEvent from "../../api/RegisTrationEvent.api.js";
import {VscOrganization} from "react-icons/vsc";
import allParticipants from "../../api/GetAllParticipants.api";
import ApiAttend from "../../api/AttendEvent.api.js";

import Qrcode from "../qr-code/Qrcode";
import ApiUpdateScore from "../../api/UpdateScore.api";
import AlertCustom from "../AlertCustome/AlertCustom";
import CountDown from "../CountDown/CountDown";
const CardInfo = ({data, eventType, img}) => {
  console.log(data);
  const [qr_data, setQrData] = useState([]);
  // const [listRegistration, setListRegistration] = useState([]);
  const [checkRegister, setCheckRegister] = useState(false);
  const [checkAttend, setCheckAttend] = useState(false);
  // console.log("listRegistration", listRegistration);
  const [showQR, setShowQr] = useState(false);
  const [idParticipant, setIdParticipant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [showCountDown, setshowCountDown] = useState(false);
  // const {alertComponent, check, setCheck} = useAlert({
  //   mess: "Do you want to register?",
  // });

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    allParticipants
      .getAllParticipants(data._id)
      .then((data) => {
        console.log(data);
        if (data.length > 0 && dataUser) {
          data.filter((item) => {
            if (item.accountId === dataUser.id) {
              setCheckRegister(true);
              setIdParticipant({_id: item._id, eventId: item.eventId});
              if (item.isAttended === true) {
                setCheckAttend(true);
              } else {
                setCheckAttend(false);
              }
            }
          });
        } else {
          setCheckRegister(false);
          setIdParticipant("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data._id, qr_data]);
  const handleAttendEvent = (e) => {
    e.preventDefault();
    const dataUser = JSON.parse(localStorage.getItem("user"));
    if (checkAttend) return;
    ApiAttend.AttendEvent(idParticipant)
      .then((data) => {
        if (data.success) {
          setCheckAttend(true);
          toast.success(data.message);
          ApiUpdateScore.UpdateScore(dataUser.id)
            .then((data) => {
              if (data.success) {
                setMsg(data.message);
                setShowAlert(true);
              }
            })
            .catch((err) => console.log(err));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    if (checkRegister) return;

    const dataUser = JSON.parse(localStorage.getItem("user"));
    if (!dataUser) {
      return toast.error("You are not logged in");
    }
    const values = {
      eventId: data._id,
      accountId: dataUser.id,
    };

    ApiRegistrationEvent.RegistrationEvent(values).then((data) => {
      if (data.success === false) {
        toast.error(data.message);
      } else {
        setQrData(data.Data_QR);
        toast.success("Registration successful");
      }
    });
  };
  return (
    <>
      <div className="info-event-detail">
        <div className="info-event-detail-img">
          <img src={`http://localhost:8000/${data.img}`} alt="" />
        </div>
        <div className="info-event-detail-text">
          <h3>{data.name}</h3>
          <span>
            <AiOutlineClockCircle />
            {data.timeStart}-
            <Moment format="DD/MM/YYYY">{data.dateOfEvent}</Moment>
          </span>
          <span>
            <HiOutlineLocationMarker />
            {data.address}
          </span>
          <span>
            <VscOrganization />
            {data.organizedBy}
          </span>

          <span>
            <MdOutlineCategory />
            {eventType.length > 0 && eventType.map((item) => item.name)}
          </span>
          <div className="form-group">
            <form className="form-register-event" onSubmit={handleRegistration}>
              <Button
                buttonStyle={
                  checkRegister ? "btn-follow-register" : "btn-follow"
                }
                type="submit"
                buttonSize="btn-xl"
              >
                {checkRegister ? (
                  <>
                    <AiFillCheckCircle /> Registered
                  </>
                ) : (
                  <>
                    <AiOutlineCheckCircle />
                    Register
                  </>
                )}
              </Button>
            </form>
            {checkRegister && (
              <>
                <form
                  onSubmit={handleAttendEvent}
                  className="form-register-event"
                >
                  <Button
                    buttonStyle={
                      checkAttend ? "btn-attend-success" : "btn-attend"
                    }
                    type="submit"
                    buttonSize="btn-xl"
                  >
                    {checkAttend ? (
                      <>
                        <AiFillStar /> Attended
                      </>
                    ) : (
                      <>
                        <AiOutlineStar />
                        Attend
                      </>
                    )}
                  </Button>
                </form>
                <div>or</div>
                <div className="qr-code" onClick={() => setShowQr(true)}>
                  Scan QR Code
                  <AiOutlineQrcode />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showQR && <Qrcode open={showQR} handleClose={() => setShowQr(false)} />}
      {showAlert && (
        <AlertCustom
          title="congratulations"
          msg={msg}
          handleClose={setShowAlert}
        />
      )}
      {showCountDown && <CountDown />}
    </>
  );
};

export default CardInfo;
