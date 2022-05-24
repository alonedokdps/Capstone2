import axios from "./AxiosClient";
const updatePassword = async (idacc, values) => {
  const {data} = await axios({
    method: "put",
    url: `/account/updatePassword/${idacc}`,
    data: values,
  });
  return data;
};

const ApiupdatePassword = {updatePassword};
export default ApiupdatePassword;
