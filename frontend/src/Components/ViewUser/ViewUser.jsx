import React, {useEffect, useState} from "react";
import "./style.scss";
import {AiOutlineCloseCircle} from "react-icons/ai";
import ApiGetUserById from "../../api/GetUserById.api";
import AOS from "aos";
import "aos/dist/aos.css";
const ViewUser = ({show, setShow, idUser}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    AOS.init();
  });
  useEffect(() => {
    ApiGetUserById.GetUserById(idUser)
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [idUser]);
  return (
    <div className="entrie-container">
      <div className="entire" data-aos="flip-left">
        <div className="btn-close-entrie" onClick={() => setShow(false)}>
          <AiOutlineCloseCircle />
        </div>
        <div className="in-entire">
          <div className="left-cov">
            <div className="profile-avatar">
              <img
                src={
                  data.avatar
                    ? `http://localhost:8000/${data.avatar}`
                    : "https://scontent.fdad3-6.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=JnDLo_5PpjYAX9zaReD&_nc_oc=AQnI0cWER_r6mjFCD6e6GL2WziUZtgXLqF3QTO3AAExpM-2CCq21fvwvF-D3qJ_Di8HQH_JFUTp9f9IG4jpJp2p7&_nc_ht=scontent.fdad3-6.fna&oh=00_AT-xlXhgljBhE8R1-KDEK-qWrN11O6wZ5rw25R2j4eIkSw&oe=62970D78"
                }
                alt=""
              />
            </div>
            <div className="basic">
              {data.fullname}
              <span>{data.role}</span>
              <span className="ball"></span>
            </div>
          </div>
          <div className="right-cov">
            <div className="detail">
              <h3> Profile</h3>
            </div>
            <div className="full-detail">
              <h4>Fullname</h4>
              <p>{data.fullname}</p>
              <h4>Email</h4>
              <p>{data.email}</p>
              <h4>Phone</h4>
              <p>{data.phone}</p>
              <h4>Department</h4>
              <p>{data.departmentId}</p>

              <h4>Course</h4>
              <p>{data.courseId}</p>
              <h4>Class</h4>
              <p>{data.class}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
