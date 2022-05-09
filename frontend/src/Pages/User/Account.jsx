import React, {useEffect, useState} from "react";
import "./Account.scss";
import {BsFillPencilFill} from "react-icons/bs";
import {AiOutlineClose} from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
const Account = ({userById}) => {
  console.log("user", userById);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="user-account">
      <h1 data-aos="fade-right" className={show && "edit"}>
        {show ? "Edit Account" : "Account"}
      </h1>
      <div className="user-account-container">
        <form
          autocomplete="off"
          className="user-account-container-form"
          data-aos="fade-right"
        >
          <div className="edit-btn">
            <button
              type="button"
              className={show && "active"}
              onClick={() => setShow(!show)}
            >
              {show ? (
                <>
                  <AiOutlineClose /> Cancel
                </>
              ) : (
                <>
                  {" "}
                  <BsFillPencilFill /> Edit
                </>
              )}
            </button>
          </div>
          <div className="account-input-fields">
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="fullname">
                Fullname
              </label>
              <input
                autocomplete="off"
                type="text"
                value={userById.fullname}
                onChange={handleChange}
                className={show && "edit"}
                id="fullname"
                name="fullname"
                placeholder="Enter your fullname"
              />
            </div>
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="username">
                Username
              </label>
              <input
                autocomplete="off"
                type="text"
                className={show && "edit"}
                id="username"
                defaultValue={userById.username}
                name="username"
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="email">
                Email
              </label>
              <input
                autocomplete="off"
                type="text"
                className={show && "edit"}
                id="email"
                name="email"
                defaultValue={userById.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="account-input-fields">
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="phone">
                Phone
              </label>
              <input
                autocomplete="off"
                defaultValue={userById.phone}
                type="text"
                className={show && "edit"}
                onChange={handleChange}
                id="number"
                name="phone"
                placeholder="Enter your number"
              />
            </div>
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="birthday">
                Birthday
              </label>
              <input
                autocomplete="off"
                type="date"
                className={show && "edit"}
                defaultValue={userById.birthday}
                onChange={handleChange}
                id="birthday"
                name="birthday"
                placeholder="Enter your birthday"
              />
            </div>
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="password">
                Password
              </label>
              <input
                autocomplete="off"
                type="password"
                className={show && "edit"}
                id="password"
                onChange={handleChange}
                name="password"
                defaultValue={userById.password}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="account-input-fields">
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="class">
                Class
              </label>
              <input
                autocomplete="off"
                type="text"
                className={show && "edit"}
                id="class"
                onChange={handleChange}
                defaultValue={userById.class}
                name="class"
                placeholder="Enter your number"
              />
            </div>
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="department">
                Department
              </label>
              <input
                autocomplete="off"
                type="text"
                id="department"
                className={show && "edit"}
                onChange={handleChange}
                name="department"
                defaultValue={userById.departmentId}
                placeholder="Enter your birthday"
              />
            </div>
            <div className={show ? "text-field edit" : "text-field"}>
              <label className={show && "edit"} htmlFor="coures">
                Course
              </label>
              <input
                autocomplete="off"
                type="text"
                className={show && "edit"}
                id="coures"
                onChange={handleChange}
                name="coures"
                defaultValue={userById.courseId}
                placeholder="Enter your coures"
              />
            </div>
          </div>
          {show && (
            <div className="account-input-fields" data-aos="zoom-in">
              <button
                className={
                  show ? "btn-update-account edit" : "btn-update-account"
                }
              >
                Update
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Account;
