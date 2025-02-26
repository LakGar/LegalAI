import { sendFeedbackEmail } from "../utils/email.js";

export const submitFeedback = async (req, res) => {
  try {
    const { rating, feedback, email, adminEmail } = req.body;

    if (!rating || !feedback || !email) {
      return res.status(400).json({
        status: "error",
        message: "Please provide rating, feedback, and email",
      });
    }

    // Send email notification to admin
    await sendFeedbackEmail(adminEmail, {
      userEmail: email,
      rating,
      feedback,
    });

    res.status(200).json({
      status: "success",
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to submit feedback",
    });
  }
};
