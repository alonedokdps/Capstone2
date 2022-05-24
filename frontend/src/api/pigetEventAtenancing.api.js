import axios from "./AxiosClient";
const getEventAtenancing = async (id) => {
  const {data} = await axios({
    method: "get",
    url: `/event/getEventAtenancing/${id}`,
  });
  return data;
};

const ApigetEventAtenancing = {getEventAtenancing};
export default ApigetEventAtenancing;
