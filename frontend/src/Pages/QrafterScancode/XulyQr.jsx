import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ApiAttend from "../../api/AttendEvent.api";
import ApiUpdateScore from "../../api/UpdateScore.api";

const XulyQr = ({setshowPoint}) => {
  const Navigate = useNavigate();
  const handleSubmit = () => {
    const qrdata = JSON.parse(localStorage.getItem("Qrcode"));
    if (qrdata) {
      const idEvent = qrdata?.idevent;
      const idpar = qrdata?.idPar;
      const idAcc = qrdata?.id;
      ApiAttend.AttendEvent(idEvent, idpar).then((data) => {
        if (data.success === true) {
          ApiUpdateScore.UpdateScore(idAcc)
            .then((score) => {
              if (score) {
                toast(data.message);
                Navigate(`/detail/${idEvent}`, {replace: true});
                setshowPoint(true);
              }
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };
  useEffect(() => {
    handleSubmit();
    return () => {
      const qrdata = JSON.parse(localStorage.getItem("Qrcode"));
      localStorage.setItem("Qrcode", JSON.stringify(qrdata));
    };
  }, []);
  return (
    <div className="Qr-process-mounting">
      <div className="Qr-process-mounting-content"></div>
    </div>
  );
};

export default XulyQr;
