import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.scss";
const CountDown = ({open = false, handleClose = () => {}}) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, settimerHours] = useState("00");
  const [timerMinutes, settimerMinutes] = useState("00");
  const [TimerSeconds, setTimerSeconds] = useState("00");
  let interval = useRef();
  const startTimer = () => {
    const countdownday = new Date("May 09,2023 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownday - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        settimerHours(hours);
        settimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    AOS.init();
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });
  if (typeof document === "undefined") {
    return <div className="countdown-container"></div>;
  }

  return ReactDOM.createPortal(
    <div className="countdown-container">
      <div className="countdown-container-overlay" onClick={handleClose}></div>
      <div className="countdown-container-content" data-aos="zoom-out-down">
        <h1>You can check in later...</h1>
        <ul className="countdown-container-content-datetime">
          <li className="countdown-container-content-datetime-item">
            <span className="countdown-container-content-datetime-item-number days">
              {timerDays}
            </span>
            <span className="countdown-container-content-datetime-item-text">
              days
            </span>
          </li>
          <li className="countdown-container-content-datetime-item">
            <span className="countdown-container-content-datetime-item-number hours">
              {timerHours}
            </span>
            <span className="countdown-container-content-datetime-item-text">
              hours
            </span>
          </li>
          <li className="countdown-container-content-datetime-item">
            <span className="countdown-container-content-datetime-item-number minutes">
              {timerMinutes}
            </span>
            <span className="countdown-container-content-datetime-item-text">
              minutes
            </span>
          </li>
          <li className="countdown-container-content-datetime-item">
            <span className="countdown-container-content-datetime-item-number seconds">
              {TimerSeconds}
            </span>
            <span className="countdown-container-content-datetime-item-text">
              seconds
            </span>
          </li>
        </ul>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default CountDown;
