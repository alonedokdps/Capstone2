import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ApiAttend from "../../api/AttendEvent.api";

const XulyQr = (updateStatus, setUpdateStatus) => {
  const Navigate = useNavigate();
  const handleSubmit = () => {
    const qrdata = JSON.parse(localStorage.getItem("Qrcode"));
    if (qrdata) {
      const idEvent = qrdata?.idevent;
      const idpar = qrdata?.idPar;
      ApiAttend.AttendEvent(idEvent, idpar).then((data) => {
        if (data.success === true) {
          toast(data.message);
          Navigate(`/detail/${idEvent}`, {replace: true});
        }
      });
    }
  };
  useEffect(() => {
    handleSubmit();
    return () => {};
  }, []);
  return <div className="Qr-process-mounting">........</div>;
};

export default XulyQr;
