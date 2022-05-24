import React from "react";
import "./style.scss";
import {AiTwotoneBell} from "react-icons/ai";
import {Link} from "react-router-dom";

const Thongbao = ({thongbaouser}) => {
  console.log("thongbaouser", thongbaouser);
  const style = {color: "#6a5af9"};
  return (
    <div data-aos="zoom-in-down" className="thongbao">
      <h1>Notifications</h1>
      <div className="thongbao-item">
        {thongbaouser &&
          thongbaouser.map((item) => {
            return (
              <Link to={`/detail/${item._id}`}>
                <div className="thongbao-item-content">
                  <img src={`http://localhost:8000/${item.img}`} alt="" />
                  <div className="thongbao-item-content-text">
                    <h4>{item.name}</h4>
                    <span>
                      <AiTwotoneBell style={style} /> The event is opening for
                      attendance
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Thongbao;
