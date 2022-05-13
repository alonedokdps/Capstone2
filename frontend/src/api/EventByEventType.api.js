import axios from "./AxiosClient";
const EventByEventType = async (idEvent, method) => {
  const {data} = await axios({
    method: "get",
    url: "/event/getEventByEventype/",
    params: {eventType: idEvent, getMethod: method},
  });
  return data;
};

const APIventByEventType = {EventByEventType};
export default APIventByEventType;
