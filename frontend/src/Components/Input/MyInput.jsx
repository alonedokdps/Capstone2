import React from "react";
import {useController} from "react-hook-form";

const MyInput = ({control, ...props}) => {
  const {field} = useController({control, name: props.name, defaultValue: ""});
  return <input {...field} {...props} className="myinput"></input>;
};

export default MyInput;
