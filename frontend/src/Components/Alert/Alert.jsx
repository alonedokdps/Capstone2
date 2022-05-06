import {confirmAlert} from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import React, {useState} from "react";

export default function useAlert({mess}) {
  const [check, setCheck] = useState(false);
  const alertComponent = (
    <>
      {check &&
        confirmAlert({
          title: "Confirm",
          message: mess,

          confirmLabel: "Confirm",
          cancelLabel: "Cancel",
          onConfirm: () => alert("Action after Confirm"),
          onCancel: () => setCheck(false),
          overlayClassName: "overlay-custom-class-name",
        })}
    </>
  );
  return {alertComponent, check, setCheck};
}
