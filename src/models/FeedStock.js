import mongoose from "mongoose";

const FeedStockSchema = new mongoose.Schema(
  {
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    feedName: { type: String, required: true },
    quantityKg: { type: Number, required: true },
    costPerKg: { type: Number },
    supplier: String,
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.FeedStock || mongoose.model("FeedStock", FeedStockSchema);
