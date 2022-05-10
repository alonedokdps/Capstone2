import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./Detail.scss";
import {CalendarComponent} from "@syncfusion/ej2-react-calendars";
import {BsArrowLeft} from "react-icons/bs";
import {ImLocation} from "react-icons/im";
import {BiTimeFive} from "react-icons/bi";
import {FaAudioDescription} from "react-icons/fa";

import CardInfo from "../../Components/card-info/CardInfo";
import About from "../../Components/About/About";
import ApiEventDetail from "../../api/Event.Detail.api";
import EventDetails from "../../Components/eventDetail/EventDetails";
import CountDown from "./../../Components/CountDown/CountDown";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../../Components/button/Button";
const Detail = ({eventType}) => {
  const {id} = useParams();
  const [eventDetail, setEventDetail] = useState([]);
  const dateValue = new Date(new Date());
  const txt =
    "Bức tranh kinh tế thế giới đầu nửa năm 2022 mang nhiều màu sắc khác nhau. Các nền kinh tế lớn phục hồi mạnh dựa vào các gói kích thích kinh tế trước đó hỗ trợ các chỉ số chứng khoán dao động trên vùng đỉnh. Nhưng gần như cùng thời điểm, các ngân hàng trung ương phát đi tín hiệu bắt đầu tăng lãi suất cơ bản, giảm các gói kích thích kinh tế. Trung tuần tháng 3.2022, FED- cục Dữ trữ Liên hang (Mỹ) phát đi thông điệp tăng lãi suất sáu lần trong năm nay. Chuỗi cung ứng sản xuất hàng hóa vừa phục hồi một phần thì chiến tranh Nga- Ukraine xảy ra, đẩy giá dầu thô và nhiều loại nguyên liệu sản xuất lên đỉnh cao nhất trong 10 năm, gây áp lực lạm phát lên kinh tế toàn cầu và gây quan ngại về chiến tranh tiền tệ.";

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
              <div className="detail-event-background-overlay-filter-content-infomation-calendar">
                <CalendarComponent value={dateValue}></CalendarComponent>
              </div>
              <div className="detail-event-background-overlay-filter-content-infomation-text">
                <h4>Hội nghị Đầu tư 2022: ĐỒNG TIỀN THÔNG MINH</h4>
                <span>
                  <BiTimeFive /> 7:00 - 11:00
                </span>
                <span>
                  <ImLocation />
                  157 Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP Hồ Chí
                  Minh
                </span>

                <p>
                  {txt.slice(0, 200)}
                  <span>...view</span>
                </p>
              </div>
              <div className="detail-event-background-overlay-filter-content-infomation-peoples-participant">
                <div className="detail-event-background-overlay-filter-content-infomation-peoples-participant-1">
                  <div className="detail-event-background-overlay-filter-content-infomation-peoples-participant-1-2">
                    <div className="detail-event-background-overlay-filter-content-infomation-peoples-participant-1-2-3"></div>
                  </div>
                </div>
                <Button buttonStyle="btn-registerV2">Register</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
