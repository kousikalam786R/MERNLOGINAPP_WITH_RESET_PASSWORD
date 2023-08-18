import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";

import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import {
  passwordValidate,
  resetPasswordValidate,
  usernameValidate,
} from "../helper/Validate";
import { Toaster, toast } from "react-hot-toast";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";

const Reset = () => {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: resetPasswordValidate,
    onSubmit: async (values) => {
      console.log(values);
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: "Updating...!",
        success: <b>Reset Successful...</b>,
        error: <b>Could not reset...</b>,
      });
      resetPromise.then(function () {
        navigate("/password");
      });
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter New password
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                className={styles.textbox}
                type="text"
                placeholder="Confirm Password"
              />

              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
