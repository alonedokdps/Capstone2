import axios from "./AxiosClient";
const Register = async (values) => {
  const {data} = await axios({
    method: "post",
    url: "/account/register",
    data: values,
  });
  return data;
};
const Login = async (values) => {
  const {data} = await axios({
    method: "post",
    url: "/account/login",
    data: values,
  });
  return data;
};
const ApiUser = {Register, Login};
export default ApiUser;
