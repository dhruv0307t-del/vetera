import mongoose from "mongoose";

const CattleSchema = new mongoose.Schema(
  {
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The farm owner
    
    // Basic Info
    tagId: { type: String, required: true, unique: true },
    rfid: String,
    name: String,
    species: { type: String, enum: ["COW", "BUFFALO", "GOAT", "SHEEP"], default: "COW" },
    breed: String,
    gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
    dateOfBirth: Date,
    weight: Number,
    color: String,
    identificationMarks: String,
    photoUrl: String,
    
    // Ownership & Location
    shedNumber: String,
    groupId: String,
    batchId: String,
    purchaseDate: Date,
    purchaseCost: Number,
    supplierDetails: String,

    // Status
    status: { 
      type: String, 
      enum: ["ACTIVE", "SOLD", "DECEASED", "SICK", "PREGNANT", "DRY"], 
      default: "ACTIVE" 
    },
    
    // Reproductive (For Females)
    isPregnant: { type: Boolean, default: false },
    lastCalvingDate: Date,
    expectedDeliveryDate: Date,
    lactationStage: Number, // e.g., 1st, 2nd lactation

    // Metrics & AI
    healthScore: { type: Number, min: 0, max: 100, default: 100 }, // AI calculated
    averageMilkYield: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Cattle || mongoose.model("Cattle", CattleSchema);
