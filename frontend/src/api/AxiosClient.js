import axios from "axios";

export const axiosConfig = {
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",
  },
};

export default axios.create({
  ...axiosConfig,
});
