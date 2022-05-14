import axios from "./AxiosClient";
const UpdateRole = async (id, role) => {
  const {data} = await axios({
    method: "put",
    url: `/account/updateRole/${id}`,
    data: {nameRole: role},
  });
  return data;
};

const ApiUpdateRole = {UpdateRole};
export default ApiUpdateRole;
