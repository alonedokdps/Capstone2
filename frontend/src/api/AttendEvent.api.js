import axios from "./AxiosClient";
const AttendEvent = async (idevent, idparticipant) => {
  const {data} = await axios({
    method: "patch",
    url: "/participant/AttendEvent",
    data: {
      eventId: idevent,
      _id: idparticipant,
    },
  });
  return data;
};

const ApiAttend = {AttendEvent};
export default ApiAttend;
