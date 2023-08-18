import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide Unique Username"],
    unique: [true, "Username exist"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please Provide a Unique email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: String },
  address: { type: String },
  profile: { type: String },
});
export default mongoose.model.Users || mongoose.model("User", UserSchema);
