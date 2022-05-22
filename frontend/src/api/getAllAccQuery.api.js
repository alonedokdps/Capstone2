import axios from "./AxiosClient";
const getAllAccQuery = async (
  search,
  department,
  role,
  courses,
  classess,
  byDep
) => {
  const {data} = await axios({
    method: "get",
    url: `/account/getAllAccQuery`,
    params: {
      search: search,
      department: department,
      roleGet: role,
      course: courses,
      classes: classess,
      byDep: byDep,
    },
  });
  return data;
};

const ApigetAllAccQuery = {getAllAccQuery};
export default ApigetAllAccQuery;
