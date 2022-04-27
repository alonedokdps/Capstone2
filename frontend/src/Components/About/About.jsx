import React from "react";
import "./About.scss";
const About = ({data}) => {
  return (
    <div className="about">
      <div className="about-title">
        <h3>About</h3>
      </div>
      <div className="about-description">
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default About;
