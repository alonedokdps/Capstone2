import axios from "./AxiosClient";
const DeleteEvent = async (id) => {
  const {data} = await axios({
    method: "delete",
    url: `/event/deleteEvent/${id}`,
  });
  return data;
};

const ApiDeleteEvent = {DeleteEvent};
export default ApiDeleteEvent;
