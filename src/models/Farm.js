import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farmName: { type: String, required: true },
    ownerName: String,

    farmType: {
      type: String,
      enum: ["DAIRY", "POULTRY", "GOAT_SHEEP", "PIGGERY", "MIXED"],
    },

    location: String,
    gpsCoordinates: String,
    sizeInAcres: Number,

    numberOfAnimals: Number,
    animalTypes: [String],

    businessEmail: String,
    businessPhone: String,

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Farm || mongoose.model("Farm", FarmSchema);
