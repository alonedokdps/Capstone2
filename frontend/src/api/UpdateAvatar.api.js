import axios from "./AxiosClient";
const UpdateAvatar = async (values) => {
  const {data} = await axios({
    method: "put",
    url: "/account/updateAvatar",
    data: values,
  });
  return data;
};

const ApiUpdateAvatar = {UpdateAvatar};
export default ApiUpdateAvatar;
