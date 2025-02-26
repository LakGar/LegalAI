import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import sgMail from "@sendgrid/mail";
import config from "../config/config.js";

// Initialize SendGrid
if (!config.SENDGRID_API_KEY) {
  console.error("SENDGRID_API_KEY is not configured in environment variables");
  throw new Error("Email service configuration is missing");
}

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sender = {
  email: "lakgarg2002@gmail.com", // Update this with your verified sender
  name: "LegalAI Team",
};

export const sendVerificationEmail = async (to, code, name) => {
  try {
    console.log(
      `Attempting to send verification email to: ${to} with code: ${code} and name: ${name}`
    );

    if (!to || !code || !name) {
      throw new Error("Missing required parameters for verification email");
    }

    const msg = {
      to: to,
      from: {
        email: sender.email,
        name: sender.name,
      },
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{name}", name).replace(
        "{verificationCode}",
        code
      ),
    };

    const response = await sgMail.send(msg);
    console.log("Verification email sent successfully to:", to);
    return response;
  } catch (error) {
    console.error("Error sending verification email:", {
      error: error.message,
      code: error.code,
      response: error.response?.body,
    });
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    console.log(`Attempting to send welcome email to: ${email}`);

    if (!email || !name) {
      throw new Error("Missing required parameters for welcome email");
    }

    const msg = {
      to: email,
      from: {
        email: sender.email,
        name: sender.name,
      },
      subject: "Welcome to LegalAI",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    };

    const response = await sgMail.send(msg);
    console.log("Welcome email sent successfully to:", email);
    return response;
  } catch (error) {
    console.error("Error sending welcome email:", {
      error: error.message,
      code: error.code,
      response: error.response?.body,
    });
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    console.log(`Attempting to send password reset email to: ${email}`);

    if (!email || !resetURL) {
      throw new Error("Missing required parameters for password reset email");
    }

    const msg = {
      to: email,
      from: {
        email: sender.email,
        name: sender.name,
      },
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    const response = await sgMail.send(msg);
    console.log("Password reset email sent successfully to:", email);
    return response;
  } catch (error) {
    console.error("Error sending password reset email:", {
      error: error.message,
      code: error.code,
      response: error.response?.body,
    });
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    console.log(`Attempting to send reset success email to: ${email}`);

    if (!email) {
      throw new Error("Missing required parameter for reset success email");
    }

    const msg = {
      to: email,
      from: {
        email: sender.email,
        name: sender.name,
      },
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    const response = await sgMail.send(msg);
    console.log("Password reset success email sent to:", email);
    return response;
  } catch (error) {
    console.error("Error sending reset success email:", {
      error: error.message,
      code: error.code,
      response: error.response?.body,
    });
    throw new Error(`Failed to send reset success email: ${error.message}`);
  }
};

export const FEEDBACK_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #8b5cf6; color: white; padding: 20px; border-radius: 8px; }
    .content { padding: 20px; background: #f9fafb; border-radius: 8px; margin-top: 20px; }
    .rating { font-size: 24px; color: #8b5cf6; margin: 10px 0; }
    .feedback { background: white; padding: 15px; border-radius: 8px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Feedback Received</h2>
    </div>
    <div class="content">
      <p><strong>From:</strong> {userEmail}</p>
      <p><strong>Rating:</strong></p>
      <div class="rating">{rating} ⭐</div>
      <p><strong>Feedback:</strong></p>
      <div class="feedback">
        {feedback}
      </div>
    </div>
  </div>
</body>
</html>
`;

export const sendFeedbackEmail = async (
  adminEmail,
  { userEmail, rating, feedback }
) => {
  try {
    console.log(`Attempting to send feedback email to admin: ${adminEmail}`);

    if (!adminEmail || !userEmail || !rating || !feedback) {
      throw new Error("Missing required parameters for feedback email");
    }

    const msg = {
      to: adminEmail,
      from: {
        email: sender.email,
        name: sender.name,
      },
      subject: `New Feedback Received - Rating: ${rating}/5`,
      html: FEEDBACK_EMAIL_TEMPLATE.replace("{userEmail}", userEmail)
        .replace("{rating}", rating)
        .replace("{feedback}", feedback),
    };

    const response = await sgMail.send(msg);
    console.log("Feedback email sent successfully to admin");
    return response;
  } catch (error) {
    console.error("Error sending feedback email:", {
      error: error.message,
      code: error.code,
      response: error.response?.body,
    });
    throw new Error(`Failed to send feedback email: ${error.message}`);
  }
};
