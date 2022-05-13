import axios from "./AxiosClient";
const CheckRegisterOrAttend = async (id, idAccount) => {
  const {data} = await axios({
    method: "get",
    url: `/participant/checkStatusAttendedOrRegistered/${id}`,
    params: {accId: idAccount},
  });
  return data;
};

const ApiCheckRegisterOrAttend = {CheckRegisterOrAttend};
export default ApiCheckRegisterOrAttend;
