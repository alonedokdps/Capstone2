import axios from "./AxiosClient";
const getAllEvent = async (values) => {
  const {data} = await axios({
    method: "get",
    url: "/event/getAllEvent",
  });
  return data;
};

const getAllEventApi = {getAllEvent};
export default getAllEventApi;
