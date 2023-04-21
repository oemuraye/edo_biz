import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  hasPaid: {
    type: Boolean,
  },
  payment_ref: {
    type: String,
  },
  // profile_pic: {
  //   type: String,
  // },
  // address: {
  //   type: String,
  //   required: true,
  // },
  // contact: {
  //   type: Number,
  //   required: true,
  // },
  // qualifications: {
  //   type: String,
  // },
  // field_of_study: {
  //   type: String,
  //   required: true,
  // },
  // institution_of_study: {
  //   type: String,
  //   required: true,
  // },
  // reasons_for_data_analysis: {
  //   type: String,
  //   required: true,
  // },
  // career_progression: {
  //   type: String,
  //   required: true,
  // },
});

export default mongoose.model("User", userSchema);
