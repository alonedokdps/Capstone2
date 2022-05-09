import axios from "./AxiosClient";
const getAllParticipants = async (id) => {
  const {data} = await axios({
    method: "get",
    url: `/participant/GetAllParticipants`,
    params: {eventId: id},
  });
  return data;
};

const allParticipants = {getAllParticipants};
export default allParticipants;
