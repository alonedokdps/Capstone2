import axios from "./AxiosClient";
const uppdateAllow = async (id) => {
  const {data} = await axios({
    method: "post",
    url: `/event/uppdateAllow/${id}`,
  });
  return data;
};

const ApiuppdateAllow = {uppdateAllow};
export default ApiuppdateAllow;
