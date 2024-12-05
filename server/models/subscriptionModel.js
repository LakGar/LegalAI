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
    documentLimit: {
      type: Number,
      required: true,
      default: 1,
    },
    chatLimit: {
      type: Number,
      required: true,
      default: 10,
    },
    storageLimit: {
      type: Number, // In MB or GB
      required: true,
      default: 1,
    },
    currentUsage: {
      documents: {
        type: Number,
        default: 0,
      },
      chats: {
        type: Number,
        default: 0,
      },
      storage: {
        type: Number, // In MB or GB
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastPaymentDate: {
      type: Date,
    },
    paymentHistory: [
      {
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        transactionId: {
          type: String,
        },
        status: {
          type: String,
          enum: ["success", "failed", "pending"],
          default: "success",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
