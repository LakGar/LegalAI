import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config = {
  // Server Configuration
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",

  // Database Configuration
  MONGO_URI: process.env.MONGO_URI,

  // OpenAI Configuration
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  // Email Configuration (SendGrid)
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@legalai.com",

  // AWS Configuration
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
};

// Validate required environment variables
const requiredEnvVars = [
  "JWT_SECRET",
  "MONGO_URI",
  "OPENAI_API_KEY",
  "SENDGRID_API_KEY",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_BUCKET_NAME",
  "AWS_BUCKET_REGION",
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !config[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}\n` +
      "Please check your .env file or environment configuration."
  );
}

export default config;
