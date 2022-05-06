import axios from "./AxiosClient";
const AttendEvent = async (values) => {
  const {data} = await axios({
    method: "patch",
    url: "/participant/AttendEvent",
    data: values,
  });
  return data;
};

const ApiAttend = {AttendEvent};
export default ApiAttend;
