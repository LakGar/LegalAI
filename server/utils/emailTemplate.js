export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, DodgerBlue, #1E90FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {name},</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: DodgerBlue;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>LegalAI Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, DodgerBlue, #1E90FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: DodgerBlue; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>LegalAI Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, DodgerBlue, #1E90FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: DodgerBlue; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>LegalAI Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to LegalAI</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    h1 {
      color: DodgerBlue;
    }
    .header {
      text-align: center;
      padding: 20px;
    }
    .content {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .article {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .article img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 5px;
      margin-right: 20px;
    }
    .article h3 {
      margin: 0;
      color: DodgerBlue;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #888;
      font-size: 0.8em;
    }
    .footer a {
      color: DodgerBlue;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVnYWx8ZW58MHx8MHx8fDA%3D" alt="Welcome to LegalAI" style="max-width: 100%; border-radius: 10px;">
  </div>

  <div class="content">
    <h1>Welcome {name}!</h1>
    <p>Thank you for verifying your email and joining LegalAI! We're excited to have you on board. LegalAI is your go-to platform for contract analysis and document management powered by cutting-edge AI technology. Below are some resources to help you get started and make the most out of LegalAI:</p>
    
    <div class="article">
      <img src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxlZ2FsfGVufDB8fDB8fHww" alt="Article 1">
      <div>
        <h3><a href="https://example.com/article1" style="color: DodgerBlue;">Understanding AI in Legal Contracts</a></h3>
        <p>Learn how AI is transforming the legal industry by simplifying contract review and analysis.</p>
      </div>
    </div>

    <div class="article">
      <img src="https://images.unsplash.com/photo-1447023029226-ef8f6b52e3ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxlZ2FsfGVufDB8fDB8fHww" alt="Article 2">
      <div>
        <h3><a href="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxlZ2FsfGVufDB8fDB8fHww" style="color: DodgerBlue;">Best Practices for Contract Management</a></h3>
        <p>Discover the best practices for managing contracts efficiently and ensuring compliance.</p>
      </div>
    </div>

    <div class="article">
      <img src="https://example.com/article3-thumbnail.jpg" alt="Article 3">
      <div>
        <h3><a href="https://plus.unsplash.com/premium_photo-1698084059560-9a53de7b816b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGxlZ2FsfGVufDB8fDB8fHww" style="color: DodgerBlue;">How LegalAI Improves Your Workflow</a></h3>
        <p>Explore how LegalAI's features can enhance your legal workflow and boost productivity.</p>
      </div>
    </div>

    <p>We’re committed to helping you succeed with LegalAI. If you have any questions or need assistance, feel free to <a href="https://example.com/support" style="color: DodgerBlue;">contact our support team</a>.</p>

    <p>Best regards,<br>The LegalAI Team</p>
  </div>

  <div class="footer">
    <p>Stay connected with us:</p>
    <p>
      <a href="https://twitter.com/legalai">Twitter</a> | 
      <a href="https://linkedin.com/company/legalai">LinkedIn</a> | 
      <a href="https://facebook.com/legalai">Facebook</a>
    </p>
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>&copy; ${new Date().getFullYear()} LegalAI. All rights reserved.</p>
  </div>
</body>
</html>
`;
