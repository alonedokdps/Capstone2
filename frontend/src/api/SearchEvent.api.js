import axios from "./AxiosClient";
const SearchApi = async (name) => {
  const {data} = await axios({
    method: "get",
    url: "/event/Search/",
    params: {name: name},
  });
  return data;
};

const ApiSearch = {SearchApi};
export default ApiSearch;
