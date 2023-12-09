import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bootcampId: {
    type: Schema.Types.ObjectId,
    ref: "BootcampUser",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});
  

export default mongoose.model("Token", tokenSchema);
