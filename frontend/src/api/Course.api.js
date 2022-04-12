import axios from "./AxiosClient";
const getCourses = async () => {
  const {data} = await axios({
    method: "get",
    url: "/course",
  });
  return data;
};

const ApiCourses = {getCourses};
export default ApiCourses;
