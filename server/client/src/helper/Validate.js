import toast from "react-hot-toast";
import { authenticate } from "./helper";

export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  if (values.username) {
    //check user exist or not
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exist = toast.error("User does not exist");
    }
  }

  return errors;
}
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

export async function resetPasswordValidate(values) {
  const errors = resetPasswordVerify({}, values);
  return errors;
}
export async function registerFormValidate(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

function resetPasswordVerify(error = {}, values) {
  if (values.password !== values.confirm_pwd) {
    error.exist = toast.error("Password does not match..");
  }
  return error;
}

function passwordVerify(error = {}, values) {
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    error.password = toast.error("password is required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong  Password");
  } else if (values.password.length < 4) {
    error.password = toast("Password must have 4 character");
  } else if (!specialChar.test(values.password)) {
    error.password = toast("Password must have special Character");
  }
  return error;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username is required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }
  return error;
}
function emailVerify(error = {}, values) {
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.email) {
    error.email = toast.error("Email Required...");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email");
  } else if (!specialChar.test(values.email)) {
    error.email = toast.error("Invalid Email address");
  }
  return error;
}
