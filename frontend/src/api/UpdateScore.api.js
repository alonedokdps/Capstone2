import axios from "./AxiosClient";
const UpdateScore = async (id) => {
  const {data} = await axios({
    method: "put",
    url: `/account/updateScore`,
    data: {accountId: id},
  });
  return data;
};

const ApiUpdateScore = {UpdateScore};
export default ApiUpdateScore;
