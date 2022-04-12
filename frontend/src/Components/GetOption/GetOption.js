import React, {useEffect, useState} from "react";
import ApiCourses from "../../api/Course.api";

import ApiDepartment from "../../api/Department.api";
const GetOption = ({getName}) => {
  const [option, setOption] = useState([]);
  useEffect(() => {
    if (getName === "department") {
      ApiDepartment.getDepartments()
        .then((res) => {
          if (res && res.length > 0) {
            setOption(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ApiCourses.getCourses()
        .then((res) => {
          if (res && res.length > 0) {
            setOption(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getName]);
  return (
    <>
      {option &&
        option.length > 0 &&
        option.map((item) => {
          return (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          );
        })}
    </>
  );
};

export default GetOption;
