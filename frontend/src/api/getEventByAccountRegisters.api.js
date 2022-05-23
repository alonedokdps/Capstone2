import axios from "./AxiosClient";
const getEventByAccountRegisters = async (id, switchquery) => {
  const {data} = await axios({
    method: "get",
    url: `/event/getEventByAccountRegisters/${id}`,
    params: {
      switch: switchquery,
    },
  });
  return data;
};

const ApigetEventByAccountRegisters = {getEventByAccountRegisters};
export default ApigetEventByAccountRegisters;
