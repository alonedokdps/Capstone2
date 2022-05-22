import React, {useEffect, useState} from "react";
import "./style.scss";
import {IoIosArrowUp} from "react-icons/io";
const ScrollIntoView = () => {
  const [showToggleScroll, setShowToggleScroll] = useState(false);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const ToggleScroll = () => {
    if (window.scrollY > 500) {
      setShowToggleScroll(true);
    } else {
      setShowToggleScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", ToggleScroll);
    return () => {
      window.removeEventListener("scroll", ToggleScroll);
    };
  }, []);
  return (
    <>
      {showToggleScroll && (
        <div
          onClick={scrollTop}
          data-aos="zoom-out"
          className="scroll-into-top"
        >
          <IoIosArrowUp
            style={{
              fontSize: "40px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ScrollIntoView;
