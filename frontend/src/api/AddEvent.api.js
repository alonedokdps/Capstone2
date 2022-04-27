import axios from "./AxiosClient";
const addEvent = async (values) => {
  const {data} = await axios({
    method: "post",
    url: "/event/addEvent",
    data: values,
  });
  return data;
};

const ApiEvent = {addEvent};
export default ApiEvent;
