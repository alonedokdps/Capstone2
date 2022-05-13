import axios from "./AxiosClient";
const GetRegister = async (id) => {
  const {data} = await axios({
    method: "get",
    url: `/participant/getRegisteredOfEvent/${id}`,
  });
  return data;
};

const APIGetRegister = {GetRegister};
export default APIGetRegister;
