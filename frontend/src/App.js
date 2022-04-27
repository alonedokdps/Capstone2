import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";

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
function App() {
  const [eventType, setEventType] = useState([]);
  const [totalData, setTotalData] = useState([]);
  useEffect(() => {
    ApiEventType.getEventType()
      .then((data) => {
        if (data) {
          setEventType(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
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
            <Route index path="account" element={<h1>account</h1>} />
            <Route path="event" element={<h1>event</h1>} />
          </Route>
        </Routes>
      </ScrollToTop>
      <ReactToastify />
    </BrowserRouter>
  );
}

export default App;
