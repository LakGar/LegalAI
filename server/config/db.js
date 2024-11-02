import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("Couldn't connect to MongoDB: ", error.message);
    process.exit(1); // Exit the process with an error code of 1 to indicate failure.
  }
};
