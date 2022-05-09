import axios from "./AxiosClient";
const getAllAccount = async (id) => {
  const {data} = await axios({
    method: "get",
    url: `/account/getAllAccount`,
  });
  return data;
};

const ApiGetAllAccount = {getAllAccount};
export default ApiGetAllAccount;
