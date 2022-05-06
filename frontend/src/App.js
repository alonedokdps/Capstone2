import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import moment from "moment";
import Layout from "./Layout/Layout";
import Detail from "./Pages/detail/Detail";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ApiEventType from "./api/EventType.api";
import getAllEventApi from "./api/AllEvent.api";
import ReactToastify from "./Components/react-toastify/ReactToastify";
import AddEvent from "./Pages/AddEvent/AddEvent";
import {useEffect, useState} from "react";
import ScrollToTop from "./Components/ScrollTop/ScrollToTop";
import UserPage from "./Pages/User/UserPage";

import Account from "./Pages/User/Account";
import ApiGetUserById from "./api/GetUserById.api";
import ApiCourses from "./api/Course.api";
function App() {
  const [eventType, setEventType] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      ApiCourses.getCourses()
        .then((courses) => setCourse(courses))
        .catch((err) => console.log(err));
      ApiEventType.getEventType()
        .then((data) => {
          if (data) {
            setEventType(data);
          }
        })
        .catch((err) => console.log(err));
      ApiGetUserById.GetUserById(userData.id)
        .then((data) => {
          const x = {...data};
          const y = Object.assign({}, x, {
            birthday: moment(x.birthday).format("YYYY-MM-DD"),
            // courseId: () => {x.},
          });
          console.log(y);
          setUser(y);
        })
        .catch((err) => console.log(err));
    }
    getAllEventApi
      .getAllEvent()
      .then((data) => {
        if (data) {
          setTotalData(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout data={totalData} />}>
              <Route index element={<Home eventType={eventType} />} />
              <Route
                path="detail/:id"
                element={<Detail eventType={eventType} />}
              />
              <Route path="movies" element={<h3>dsadsadsa</h3>} />
            </Route>
            <Route path="/login" element={<Login getForm="login" />} />{" "}
            <Route path="/register" element={<Login getForm="register" />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/user" element={<UserPage />}>
              <Route
                index
                path="account"
                element={
                  <Account user={user} eventType={eventType} course={course} />
                }
              />
              <Route path="event" element={<h1>Event</h1>} />
            </Route>
          </Routes>
        </ScrollToTop>
        <ReactToastify />
      </BrowserRouter>
    </>
  );
}

export default App;
