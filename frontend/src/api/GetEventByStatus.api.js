import axios from "./AxiosClient";
const getEventByStatus = async (status) => {
  const {data} = await axios({
    method: "get",
    url: `/event/getEventByStatus`,
    params: {
      status: status,
    },
  });
  return data;
};

const APigetEventByStatus = {getEventByStatus};
export default APigetEventByStatus;
