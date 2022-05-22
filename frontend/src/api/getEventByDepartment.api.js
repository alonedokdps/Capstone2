import axios from "./AxiosClient";
const getEventByDepartment = async (idDepartment, queryStt) => {
  const {data} = await axios({
    method: "get",
    url: `/event/getEventByDepartment`,
    params: {
      id: idDepartment,
      stt: queryStt,
    },
  });
  return data;
};

const ApigetEventByDepartment = {getEventByDepartment};
export default ApigetEventByDepartment;
