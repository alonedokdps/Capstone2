import axios from "./AxiosClient";
const RegistrationEvent = async (values) => {
  const {data} = await axios({
    method: "post",
    url: "/participant/RegisterEvent",
    data: values,
  });
  return data;
};

const ApiRegistrationEvent = {RegistrationEvent};
export default ApiRegistrationEvent;
