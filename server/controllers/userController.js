import User from "../models/userModel.js";
import Business from "../models/businessModel.js";
import { upload } from "../config/multer.js";

/**
 * Get user details with populated fields.
 * @route GET /user
 * @access Private
 */
export const getUser = async (req, res) => {
  try {
    console.log("getting user...");
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Get user with essential populations
    const user = await User.findById(userId)
      .populate("documents")
      .populate("chats")
      .populate("subscription")
      .populate("business") // ✅ Added business population
      .lean()
      .setOptions({ strictPopulate: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data
    return res.status(200).json({
      success: true,
      data: {
        ...user,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : error.message,
    });
  }
};

/**
 * Update user details
 * @route PUT /user
 * @access Private
 */
export const updateUser = async (req, res) => {
  try {
    const userId = req.user?._id; // Ensure `userId` exists

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Validate that the body contains valid fields to update
    const allowedUpdates = [
      "firstname",
      "lastname",
      "email",
      "password",
      "profileImg",
      "business",
    ];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((field) =>
      allowedUpdates.includes(field)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: "Invalid update fields provided",
      });
    }

    // Find the user and update with new details
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updated fields adhere to schema validation
    });

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with the updated user data
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : error.message,
    });
  }
};

/**
 * Delete user account
 * @route DELETE /user
 * @access Private
 */
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : error.message,
    });
  }
};

/**
 * Upload profile image
 * @route POST /user/profile-image
 * @access Private
 */
export const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Ensure an image file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Update the user's profile image URL in the database
    const imagePath = req.file.path; // Path to the uploaded image
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImg: imagePath },
      { new: true } // Return updated user
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : error.message,
    });
  }
};
