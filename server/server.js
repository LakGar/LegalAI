import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Allow credentials from the specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
    credentials: true, // Allow cookies or credentials
  })
);

// Parse JSON body
app.use(express.json());

app.use(cookieParser());

// Routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// Test Route
app.get("/test", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log("Server is running on port", process.env.PORT || 8000);
});
