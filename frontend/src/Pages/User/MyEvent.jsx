import React from "react";
import "./myevent.scss";
import {AiOutlineDropbox} from "react-icons/ai";
import Cardmini from "./../../Components/cardSmall/Cardmini";
const MyEvent = ({totalData, handleSwitch, switchData}) => {
  console.log("check switchData", switchData);
  return (
    <div className="my-event-user">
      <div className="my-event-user-pick">
        <h1
          className={switchData === "registered" && "active"}
          data-value="registered"
          onClick={handleSwitch}
        >
          Registered
        </h1>{" "}
        |{" "}
        <h1
          className={switchData === "attended" && "active"}
          data-value="attended"
          onClick={handleSwitch}
        >
          Attended
        </h1>
      </div>
      <div className="my-event-user-container">
        <div className="registered">
          <div className="registered-grid">
            {totalData &&
              totalData.map((item) => {
                return <Cardmini data={item} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvent;
