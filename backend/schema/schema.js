import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  image: { type: String }, // This will store the Cloudinary image URL
}, {
  timestamps: true // Correct way to enable timestamps
});

const User = mongoose.model("User", userSchema);

export default User;