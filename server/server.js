import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import vercel from "@vercel/node"; // ✅ Fix Import Issue

dotenv.config();

const app = express();

// Allow credentials from the specific origin
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/teams", teamRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Hello, World!");
});

// File Serving Route (Ensure __dirname is properly handled)
const __dirname = path.resolve();
app.get("/file/:id", async (req, res) => {
  const fileId = req.params.id;
  const filePath = path.join(__dirname, "uploads", fileId);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.sendFile(filePath);
});

// ✅ Export for Vercel
const { createServer } = vercel;
const server = createServer(app);
export default server;
