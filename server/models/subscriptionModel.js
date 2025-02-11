import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: ["Trial", "Basic", "Professional", "Enterprise"],
      required: true,
      default: "Trial",
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    paymentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    features: {
      documentLimit: {
        type: Number,
        default: 10,
      },
      storageLimit: {
        type: Number,
        default: 1024, // in MB
      },
      aiChatLimit: {
        type: Number,
        default: 100,
      },
    },
  },
  { timestamps: true }
);

// Create and export the model
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
