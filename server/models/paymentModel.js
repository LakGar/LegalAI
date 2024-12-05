import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: false, // Not all payments may be tied to subscriptions
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD", // Default currency, can be extended for multi-currency support
    },
    transactionId: {
      type: String,
      required: true,
      unique: true, // To avoid duplicate entries
    },
    paymentMethod: {
      type: String,
      enum: [
        "credit_card",
        "paypal",
        "stripe",
        "apple_pay",
        "google_pay",
        "other",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      default: "Payment for subscription or services",
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Can store additional payment gateway data
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
