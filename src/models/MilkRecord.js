import mongoose from "mongoose";

const MilkRecordSchema = new mongoose.Schema(
  {
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cattleId: { type: mongoose.Schema.Types.ObjectId, ref: "Cattle", required: true },
    
    date: { type: Date, required: true },
    shift: { type: String, enum: ["AM", "PM"], required: true },
    
    yieldLiters: { type: Number, required: true },
    fatPercentage: { type: Number, default: 0 },
    snfPercentage: { type: Number, default: 0 },
    
    qualityStatus: { 
      type: String, 
      enum: ["EXCELLENT", "GOOD", "FAIR", "POOR", "REJECTED"], 
      default: "GOOD" 
    },
    
    // AI Insights
    yieldTrend: { type: String, enum: ["UP", "DOWN", "STABLE"], default: "STABLE" },
    predictedNextYield: Number,
  },
  { timestamps: true }
);

export default mongoose.models.MilkRecord || mongoose.model("MilkRecord", MilkRecordSchema);
