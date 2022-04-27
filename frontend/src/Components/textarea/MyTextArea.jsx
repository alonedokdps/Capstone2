import React from "react";
import {useController} from "react-hook-form";
const MyTextArea = ({control, ...props}) => {
  const {field} = useController({control, name: props.name, defaultValue: ""});
  return <textarea {...field} {...props}></textarea>;
};

export default MyTextArea;
