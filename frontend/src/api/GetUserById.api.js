import axios from "./AxiosClient";
const GetUserById = async (id) => {
  const {data} = await axios({
    method: "get",
    url: `/account/getAccount/${id}`,
  });
  return data;
};

const ApiGetUserById = {GetUserById};
export default ApiGetUserById;
