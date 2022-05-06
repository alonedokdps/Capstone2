import React, {useState} from "react";
import "./Account.scss";
import {BsFillPencilFill} from "react-icons/bs";
import {AiOutlineClose} from "react-icons/ai";

const Account = ({user, eventType, course}) => {
  console.log(eventType);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    console.log(values);
    setValues({...values, [e.target.name]: e.target.value});
  };
  return (
    <div className="user-account">
      <h1 className={show && "edit"}>{show ? "Edit Account" : "Account"}</h1>
      <div className="user-account-container">
        <form autocomplete="off" className="user-account-container-form">
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
                defaultValue={user.fullname}
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
                defaultValue={user.username}
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
                defaultValue={user.email}
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
                defaultValue={user.phone}
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
                defaultValue={user.birthday}
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
                defaultValue={user.password}
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
                defaultValue={user.class}
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
                defaultValue={user.departmentId}
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
                defaultValue={user.courseId}
                placeholder="Enter your coures"
              />
            </div>
          </div>
          {show && (
            <div className="account-input-fields">
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
