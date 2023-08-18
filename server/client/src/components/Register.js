import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import {
  passwordValidate,
  registerFormValidate,
  usernameValidate,
} from "../helper/Validate";
import toast, { Toaster } from "react-hot-toast";
import converToBase64 from "../helper/Convert";
import { registerUser } from "../helper/helper";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "kousik404",
      password: "alam@123",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: registerFormValidate,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      //console.log(values);
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating ...",
        success: <b>Register Successfully..."</b>,
        error: <b>Could not Register.</b>,
      });
      registerPromise.then(function () {
        navigate("/");
      });
    },
  });
  const onUpload = async (e) => {
    const base64 = await converToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "45%", height: "93%", paddingTop: "1em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-500">
              Happy to join You
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password*"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{" "}
                <Link className="text-red-500" to="/">
                  LogIn Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
