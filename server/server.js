import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

// Import all models first
import "./models/subscriptionModel.js";
import "./models/userModel.js";
import "./models/businessModel.js";
import "./models/documentModel.js";
import "./models/chatModel.js";
import "./models/folderModel.js";
import "./models/teamModel.js";
import "./models/paymentModel.js";

// Load environment variables
dotenv.config();

// Validate required AWS credentials
const requiredEnvVars = [
  "AWS_BUCKET_NAME",
  "AWS_BUCKET_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars);
  process.exit(1);
}

// Log AWS configuration (without sensitive values)
console.log("AWS Configuration:", {
  region: process.env.AWS_BUCKET_REGION,
  bucket: process.env.AWS_BUCKET_NAME,
  hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
  hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
});

const app = express();

// Simpler CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://legalai.dev"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// // Add headers middleware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// Connect to Database
connectDB();

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/feedback", feedbackRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Hello, World!");
});

// File Serving Route
const __dirname = path.resolve();
app.get("/file/:id", async (req, res) => {
  const fileId = req.params.id;
  const filePath = path.join(__dirname, "uploads", fileId);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.sendFile(filePath);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
