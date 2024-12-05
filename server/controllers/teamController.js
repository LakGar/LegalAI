import { Team } from "../models/teamModel.js";
import { User } from "../models/userModel.js";

/**
 * Create a new team
 * @route POST /teams
 * @access Private
 */
export const createTeam = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: "User ID and team name are required",
      });
    }

    // Create the team
    const team = new Team({
      name,
      owner: userId,
      members: [{ user: userId, role: "admin" }],
    });

    await team.save();

    // Add team reference to the user
    await User.findByIdAndUpdate(userId, { $push: { team: team._id } });

    return res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error creating team:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all teams for a user
 * @route GET /teams
 * @access Private
 */
export const getUserTeams = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const teams = await Team.find({ "members.user": userId }).populate(
      "members.user",
      "firstname lastname email"
    );

    return res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Add a member to a team
 * @route POST /teams/:id/members
 * @access Private
 */
export const addTeamMember = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { memberId, role } = req.body;

    if (!teamId || !memberId || !role) {
      return res.status(400).json({
        success: false,
        message: "Team ID, member ID, and role are required",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Check if the user is already a member
    if (team.members.some((member) => member.user.toString() === memberId)) {
      return res.status(400).json({
        success: false,
        message: "User is already a member of the team",
      });
    }

    // Add the new member
    team.members.push({ user: memberId, role });
    await team.save();

    // Add team reference to the member
    await User.findByIdAndUpdate(memberId, { $push: { team: teamId } });

    return res.status(200).json({
      success: true,
      message: "Member added successfully",
      data: team,
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
 * Update a team member's role
 * @route PUT /teams/:id/members/:memberId
 * @access Private
 */
export const updateTeamMemberRole = async (req, res) => {
  try {
    const teamId = req.params.id;
    const memberId = req.params.memberId;
    const { role } = req.body;

    if (!teamId || !memberId || !role) {
      return res.status(400).json({
        success: false,
        message: "Team ID, member ID, and role are required",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Find the member and update their role
    const member = team.members.find((m) => m.user.toString() === memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found in the team",
      });
    }

    member.role = role;
    await team.save();

    return res.status(200).json({
      success: true,
      message: "Member role updated successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error updating team member role:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Remove a member from a team
 * @route DELETE /teams/:id/members/:memberId
 * @access Private
 */
export const removeTeamMember = async (req, res) => {
  try {
    const teamId = req.params.id;
    const memberId = req.params.memberId;

    if (!teamId || !memberId) {
      return res.status(400).json({
        success: false,
        message: "Team ID and member ID are required",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Remove the member
    team.members = team.members.filter((m) => m.user.toString() !== memberId);
    await team.save();

    // Remove team reference from the user
    await User.findByIdAndUpdate(memberId, { $pull: { team: teamId } });

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error removing team member:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Delete a team
 * @route DELETE /teams/:id
 * @access Private
 */
export const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const userId = req.user?._id;

    if (!teamId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Team ID and User ID are required",
      });
    }

    const team = await Team.findOneAndDelete({ _id: teamId, owner: userId });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found or access denied",
      });
    }

    // Remove team references from all members
    for (const member of team.members) {
      await User.findByIdAndUpdate(member.user, { $pull: { team: teamId } });
    }

    return res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
