import React, {useState} from "react";
import Button from "../button/Button";
import "./Style.scss";
import {useNavigate} from "react-router-dom";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import ApiUser from "../../api/User.api";
import Eye from "../eye/Eye";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import ErrorMsg from "../errorsMsg/ErrorMsg";
import {useCookies} from "react-cookie";
const SignIn = ({change}) => {
  const [showPass, setShowPass] = useState(false);
  const style = {color: "#2dc275", cursor: "pointer"};
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  console.log(cookies);
  const formik = useFormik({
    //khoi tao cac gia tri cua form
    initialValues: {username: "", password: ""},
    validationSchema: Yup.object({
      username: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("username is required"),

      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      ApiUser.Login(values).then((res) => {
        if (res.success) {
          formik.resetForm();
          setCookie("token", res.token, {path: "/"});
          toast.success(res.message);
          navigate("/");
        } else {
          formik.resetForm();
          toast.error(res.message);
        }
      });
    },
  });
  console.log(formik);
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <h3>
        SIGN IN{" "}
        <HiOutlineSwitchHorizontal
          style={style}
          onClick={() => {
            navigate("/register");
          }}
        />
      </h3>
      <div class="text-field">
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
      <div class="text-field">
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

      <div className="text-field">
        <Button type="submit" buttonStyle="btn-login">
          <span>Sign in</span>
        </Button>
      </div>
    </form>
  );
};

export default SignIn;
