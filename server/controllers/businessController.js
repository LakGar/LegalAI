import { Business } from "../models/businessModel.js";
import { User } from "../models/userModel.js";

/**
 * Create a new business
 * @route POST /business
 * @access Private
 */
export const createBusiness = async (req, res) => {
  try {
    const userId = req.user?._id; // Ensure logged-in user

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const { name, email, phone, address, industry } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !industry) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Create a new business
    const business = new Business({
      name,
      email,
      phone,
      address,
      industry,
      owner: userId,
    });

    await business.save();

    // Update the user to reference the business
    await User.findByIdAndUpdate(userId, { business: business._id });

    return res.status(201).json({
      success: true,
      message: "Business created successfully",
      data: business,
    });
  } catch (error) {
    console.error("Error creating business:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
/**
 * Get business details
 * @route GET /business/:id
 * @access Private
 */
export const getBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;

    if (!businessId) {
      return res
        .status(400)
        .json({ success: false, message: "Business ID is required" });
    }

    const business = await Business.findById(businessId)
      .populate("owner", "firstname lastname email")
      .populate("teamMembers", "firstname lastname email");

    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    return res.status(200).json({ success: true, data: business });
  } catch (error) {
    console.error("Error fetching business:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
/**
 * Add a team member to a business
 * @route POST /business/:id/team
 * @access Private
 */
export const addTeamMember = async (req, res) => {
  try {
    const businessId = req.params.id;
    const { memberId } = req.body;

    if (!businessId || !memberId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Business ID and member ID are required",
        });
    }

    const business = await Business.findById(businessId);

    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    // Ensure the user is not already a member
    if (business.teamMembers.includes(memberId)) {
      return res
        .status(400)
        .json({ success: false, message: "User is already a team member" });
    }

    business.teamMembers.push(memberId);
    await business.save();

    return res.status(200).json({
      success: true,
      message: "Team member added successfully",
      data: business,
    });
  } catch (error) {
    console.error("Error adding team member:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
/**
 * Delete a business
 * @route DELETE /business/:id
 * @access Private
 */
export const deleteBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;

    if (!businessId) {
      return res
        .status(400)
        .json({ success: false, message: "Business ID is required" });
    }

    const business = await Business.findByIdAndDelete(businessId);

    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    // Remove reference from the owner
    await User.findByIdAndUpdate(business.owner, { $unset: { business: "" } });

    return res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting business:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
