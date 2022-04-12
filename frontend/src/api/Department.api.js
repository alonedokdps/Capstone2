import axios from "./AxiosClient";
const getDepartments = async () => {
  const {data} = await axios({
    method: "get",
    url: "/department",
  });
  return data;
};

const ApiDepartment = {getDepartments};
export default ApiDepartment;
