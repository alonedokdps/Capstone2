import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {
  AiOutlineCheckCircle,
  AiTwotoneStar,
  AiFillCheckCircle,
} from "react-icons/ai";

import "./cardinfo.scss";
import Moment from "react-moment";
import {AiOutlineClockCircle, AiOutlineStar} from "react-icons/ai";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {MdOutlineCategory} from "react-icons/md";
import {toast} from "react-toastify";
import ApiRegistrationEvent from "../../api/RegisTrationEvent.api.js";
import {VscOrganization} from "react-icons/vsc";
import allParticipants from "../../api/GetAllParticipants.api";

const CardInfo = ({data, eventType}) => {
  const [qr_data, setQrData] = useState([]);
  // const [listRegistration, setListRegistration] = useState([]);
  const [checkRegister, setCheckRegister] = useState(false);
  // console.log("listRegistration", listRegistration);

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    allParticipants
      .getAllParticipants(data._id)
      .then((data) => {
        if (data.length > 0 && dataUser) {
          data.filter((item) => {
            if (item.accountId === dataUser.id) {
              setCheckRegister(true);
            }
          });
        } else {
          setCheckRegister(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data._id, qr_data]);
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
              buttonStyle={checkRegister ? "btn-follow-register" : "btn-follow"}
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
              <form className="form-register-event">
                <Button
                  buttonStyle={
                    checkRegister ? "btn-follow-register" : "btn-follow"
                  }
                  type="submit"
                  buttonSize="btn-xl"
                >
                  {checkRegister ? (
                    <>
                      <AiOutlineStar /> <AiTwotoneStar /> Registered
                    </>
                  ) : (
                    <>
                      <AiOutlineCheckCircle />
                      Register
                    </>
                  )}
                </Button>
              </form>
              or
              <span>QR code</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
