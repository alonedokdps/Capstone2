import axios from "./AxiosClient";
const getRegisteredOfEvent = async (id, idaccount) => {
  const {data} = await axios({
    method: "get",
    url: `/participant/getRegisteredbyidAccountOfEvent/${id}`,
    params: {
      idacc: idaccount,
    },
  });
  return data;
};

const apigetRegisteredOfEvent = {getRegisteredOfEvent};
export default apigetRegisteredOfEvent;
