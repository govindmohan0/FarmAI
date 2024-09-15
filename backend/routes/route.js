import { Router } from "express";
import user from "../schema/schema.js";
import { uploadOnCloudinary } from "../cloudinary/cloudinary.js";
const router = Router();
import multer from "multer";
import { upload1 } from "./multer.js";

// Handle file uploads
const upload = multer({ dest: "uploads/" });

// POST route to upload user data and image
router.post(
  "/",
  upload1.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    try {
      console.log("File uploaded:", req.file);
      console.log("Form data:", req.body);

      const { name, email, phone_number } = req.body;

      const localFilePath = req.files?.image[0].path;
      if (!localFilePath)
        return res.status(500).json({ message: "Image upload failed" });

      const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
      if (!cloudinaryResponse) {
        console.log("Cloudinary upload failed");
        return res.status(500).json({ message: "Image upload failed" });
      }

      console.log("Cloudinary Response:", cloudinaryResponse);

      const newUser = new user({
        name,
        email,
        phone_number,
        image: cloudinaryResponse?.url || "", // Save the Cloudinary URL
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.log("Error occurred:", error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

// GET route to fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error occurred:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;