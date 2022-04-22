import React, {useState} from "react";
import "./Style.scss";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import Button from "../button/Button";
import Eye from "../eye/Eye";
import {useFormik} from "formik";
import * as Yup from "yup";
import ErrorMsg from "../errorsMsg/ErrorMsg";
import GetOption from "../GetOption/GetOption.js";
import ApiUser from "../../api/User.api.js";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
const SignUp = ({change}) => {
  const style = {color: "#2dc275", cursor: "pointer"};
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    //khoi tao cac gia tri cua form
    initialValues: {
      birthday: "",
      class: "",
      confirmpassword: "",
      courseId: "",
      departmentId: "",
      email: "",

      fullname: "",

      password: "",
      phone: "",
      username: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("fullname is required"),
      username: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("username is required"),
      class: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("class is required"),
      phone: Yup.number()
        .typeError("Must be number")
        .required("phone is required"),
      email: Yup.string()
        .email("Email not valid")
        .required("email is required"),
      birthday: Yup.date().required("birthday is required"),
      password: Yup.string().required("Password is required"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      departmentId: Yup.string().required("department is required"),
      courseId: Yup.string().required("department is required"),
    }),
    onSubmit: (values) => {
      ApiUser.Register(values)
        .then((res) => {
          if (res.success) {
            formik.resetForm();

            toast.success(res.message);
            navigate("/login");
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => console.log("err"));
    },
  });
  console.log(formik);
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <h3>
        SIGN UP{" "}
        <HiOutlineSwitchHorizontal
          style={style}
          onClick={() => {
            navigate("/login");
          }}
        />
      </h3>
      <div className="box">
        <div class="text-field register">
          <label htmlFor="fullname">Fullname</label>
          <input
            autocomplete="off"
            name="fullname"
            type="text"
            placeholder="Enter your fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          {formik.touched.fullname && formik.errors.fullname ? (
            <ErrorMsg> {formik.errors.fullname}</ErrorMsg>
          ) : null}
        </div>

        <div class="text-field register">
          <label for="username">Username</label>
          <input
            autocomplete="off"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          {formik.touched.username && formik.errors.username ? (
            <ErrorMsg> {formik.errors.username}</ErrorMsg>
          ) : null}
        </div>
      </div>
      <div className="box">
        <div class="text-field register">
          <label for="email">Email</label>
          <input
            autocomplete="off"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          {formik.touched.email && formik.errors.email ? (
            <ErrorMsg> {formik.errors.email}</ErrorMsg>
          ) : null}
        </div>
        <div class="text-field register">
          <label for="birthday">Birthday</label>
          <input
            autocomplete="off"
            name="birthday"
            type="date"
            placeholder="Enter your birthday"
            value={formik.values.birthday}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          {formik.touched.birthday && formik.errors.birthday ? (
            <ErrorMsg> {formik.errors.birthday}</ErrorMsg>
          ) : null}
        </div>
      </div>
      <div className="box">
        <div class="text-field register">
          <label for="phone">phone</label>
          <input
            autocomplete="off"
            name="phone"
            type="number"
            placeholder="Enter your phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          {formik.touched.phone && formik.errors.phone ? (
            <ErrorMsg> {formik.errors.phone}</ErrorMsg>
          ) : null}
        </div>
        <div class="text-field register">
          <label for="class">Class</label>
          <input
            autocomplete="off"
            name="class"
            type="text"
            placeholder="Enter your class"
            value={formik.values.class}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />{" "}
          {formik.touched.class && formik.errors.class ? (
            <ErrorMsg> {formik.errors.class}</ErrorMsg>
          ) : null}
        </div>
      </div>
      <div className="box">
        <div class="text-field register">
          <label htmlFor="departmentId">Department</label>
          <select
            name="departmentId"
            value={formik.values.departmentId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <GetOption getName="department" />
          </select>{" "}
          {formik.touched.departmentId && formik.errors.departmentId ? (
            <ErrorMsg> {formik.errors.departmentId}</ErrorMsg>
          ) : null}
        </div>
        <div class="text-field register">
          <label htmlFor="courseId"> Course</label>
          <select
            name="courseId"
            value={formik.values.courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <GetOption getName="course" />
          </select>{" "}
          {formik.touched.courseId && formik.errors.courseId ? (
            <ErrorMsg> {formik.errors.courseId}</ErrorMsg>
          ) : null}
        </div>
      </div>
      <div className="box">
        <div class="text-field register">
          <label class="label-password" for="password">
            Password <Eye showPass={showPass} setShowPass={setShowPass} />
          </label>
          <input
            autocomplete="off"
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.password && formik.errors.password ? (
            <ErrorMsg> {formik.errors.password}</ErrorMsg>
          ) : null}
        </div>
        <div class="text-field register">
          <label class="label-password" for="confirmpassword">
            Password <Eye showPass={showPass} setShowPass={setShowPass} />
          </label>
          <input
            autocomplete="off"
            name="confirmpassword"
            type={showPass ? "text" : "password"}
            placeholder="Enter your confirm password"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <ErrorMsg> {formik.errors.confirmpassword}</ErrorMsg>
          ) : null}
        </div>
      </div>
      <div className="text-field register button-register">
        <Button buttonStyle="btn-register" type="submit">
          <span>Sign up</span>
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
