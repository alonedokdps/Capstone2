import {BrowserRouter} from "react-router-dom";
import "./App.scss";
import Header from "./Components/header/Header";
import Layout from "./Layout/Layout";
import Detail from "./Pages/detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
