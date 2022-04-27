import axios from "./AxiosClient";
const getEventDetal = async (id) => {
  const {data} = await axios({
    method: "get",
    url: `/event/getEvent/${id}`,
  });
  return data;
};

const ApiEventDetail = {getEventDetal};
export default ApiEventDetail;
