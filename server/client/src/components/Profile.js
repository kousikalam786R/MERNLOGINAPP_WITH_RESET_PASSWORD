import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import {
  passwordValidate,
  profileValidation,
  usernameValidate,
} from "../helper/Validate";
import toast, { Toaster } from "react-hot-toast";

import useFetch from "../hooks/fetch.hook";
import converToBase64 from "../helper/Convert";
import { updateUser } from "../helper/helper";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";

const Profile = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      address: apiData?.address || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validate: profileValidation,
    onSubmit: async (values) => {
      console.log(values);
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating",
        success: <b>Update Successfully...</b>,
        error: <b>Could not Update</b>,
      });
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
    },
  });

  //Log Out handler Function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  const onUpload = async (e) => {
    const base64 = await converToBase64(e.target.files[0]);
    setFile(base64);
  };
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "45%", height: "93%", paddingTop: "1em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  className={`${styles.profile_img} `}
                  alt="avatar"
                />
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </label>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come Back Later?
                <button
                  onClick={userLogout}
                  className="text-red-500"
                  to="/reset"
                >
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
