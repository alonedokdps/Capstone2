import React from "react";
import EventDetails from "../eventDetail/EventDetails";
import "./About.scss";
const About = ({data}) => {
  return (
    <>
      <div className="about">
        <div className="about-title">
          <h3>About</h3>
        </div>
        <div className="about-description">
          <p>{data.description}</p>
        </div>
        <EventDetails />
      </div>
    </>
  );
};

export default About;
