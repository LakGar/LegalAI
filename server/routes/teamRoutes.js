import express from "express";
import {
  createTeam,
  getUserTeams,
  addTeamMember,
  updateTeamMemberRole,
  removeTeamMember,
  deleteTeam,
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a team
router.post("/", protect, createTeam);

// Get all teams for the logged-in user
router.get("/", protect, getUserTeams);

// Add a team member
router.post("/:id/members", protect, addTeamMember);

// Update a team member's role
router.put("/:id/members/:memberId", protect, updateTeamMemberRole);

// Remove a team member
router.delete("/:id/members/:memberId", protect, removeTeamMember);

// Delete a team
router.delete("/:id", protect, deleteTeam);

export default router;
