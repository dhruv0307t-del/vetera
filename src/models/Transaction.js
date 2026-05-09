import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["INCOME", "EXPENSE"], required: true },
    category: { type: String, required: true }, // e.g. Milk Sale, Feed Purchase, Medicine, Salary
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
