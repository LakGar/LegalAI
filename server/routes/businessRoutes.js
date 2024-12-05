import express from "express";
import {
  createBusiness,
  getBusiness,
  addTeamMember,
  deleteBusiness,
} from "../controllers/businessController.js";

const router = express.Router();

router.post("/", createBusiness); // Create a business
router.get("/:id", getBusiness); // Get business details
router.post("/:id/team", addTeamMember); // Add a team member
router.delete("/:id", deleteBusiness); // Delete a business

export default router;
