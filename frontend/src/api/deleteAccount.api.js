import axios from "./AxiosClient";
const deleteAccount = async (id) => {
  const {data} = await axios({
    method: "delete",
    url: `/account/deleteAccount/${id}`,
  });
  return data;
};

const ApideleteAccount = {deleteAccount};
export default ApideleteAccount;
