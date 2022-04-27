import axios from "./AxiosClient";
const getEventType = async () => {
  const {data} = await axios({
    method: "get",
    url: "/eventType",
  });
  return data;
};

const ApiEventType = {getEventType};
export default ApiEventType;
