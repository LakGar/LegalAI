import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

/**
 * Middleware to protect routes and ensure the user is authenticated
 */
export const protect = async (req, res, next) => {
  let token;

  try {
    // Log the incoming request for debugging
    console.log(
      `[Auth Middleware] Incoming request: ${req.method} ${req.originalUrl}`
    );

    // Check if the Authorization header contains a Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Extract the token
      console.log(`[Auth Middleware] Token extracted: ${token}`);

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`[Auth Middleware] Token decoded successfully:`, decoded);

        // Use `userId` instead of `id`
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
          console.warn(
            `[Auth Middleware] User not found for token: ${decoded.userId}`
          );
          return res.status(401).json({
            success: false,
            message: "Not authorized, user not found",
          });
        }

        console.log(`[Auth Middleware] User authenticated: ${req.user.email}`);
        next(); // Proceed to the next middleware or route handler
      } catch (tokenError) {
        console.error(
          `[Auth Middleware] Token verification failed:`,
          tokenError.message
        );
        return res.status(401).json({
          success: false,
          message: "Not authorized, token verification failed",
        });
      }
    } else {
      console.warn(
        `[Auth Middleware] No token provided in Authorization header`
      );
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
    }
  } catch (error) {
    console.error(`[Auth Middleware] Unexpected error:`, error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};
