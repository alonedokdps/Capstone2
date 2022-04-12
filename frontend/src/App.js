import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";

import Layout from "./Layout/Layout";
import Detail from "./Pages/detail/Detail";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

import ReactToastify from "./Components/react-toastify/ReactToastify";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="detail" element={<Detail />} />
          <Route path="movies" element={<h3>dsadsadsa</h3>} />
        </Route>
        <Route path="/login" element={<Login getForm="login" />} />{" "}
        <Route path="/register" element={<Login getForm="register" />} />
      </Routes>
      <ReactToastify />
    </BrowserRouter>
  );
}

export default App;
