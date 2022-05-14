import axios from "./AxiosClient";
const getAllAccQuery = async (search, department) => {
  const {data} = await axios({
    method: "get",
    url: `/account/getAllAccQuery`,
    params: {
      search: search,
      department: department,
    },
  });
  return data;
};

const ApigetAllAccQuery = {getAllAccQuery};
export default ApigetAllAccQuery;
