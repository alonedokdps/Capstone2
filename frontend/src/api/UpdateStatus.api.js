import axios from "./AxiosClient";
const UpdateStatus = async (id, values) => {
  const {data} = await axios({
    method: "put",
    url: `/event/updateStatus/${id}`,
    data: {status: values},
  });
  return data;
};

const ApiUpdateStatus = {UpdateStatus};
export default ApiUpdateStatus;
