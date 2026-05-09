import mongoose from "mongoose";

const EmergencySchema = new mongoose.Schema(
  {
    // Reporter info
    reporterName: { type: String, required: true },
    reporterPhone: { type: String, required: true },
    reporterEmail: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Pet info
    petName: { type: String, required: true },
    petType: { type: String, required: true }, // Dog, Cat, Bird, etc.
    petBreed: String,
    petAge: String,
    petColor: String,

    // Emergency details
    emergencyType: {
      type: String,
      enum: ["INJURY", "ILLNESS", "ACCIDENT", "POISONING", "BREATHING", "LOST_PET", "STRAY", "OTHER"],
      required: true,
    },
    description: { type: String, required: true },
    symptoms: [String],
    severity: { type: String, enum: ["MILD", "MODERATE", "CRITICAL"], default: "MODERATE" },

    // Location
    address: String,
    city: { type: String, required: true },
    state: String,
    pinCode: String,
    latitude: Number,
    longitude: Number,

    // Status
    status: { type: String, enum: ["OPEN", "ACKNOWLEDGED", "RESOLVED", "CLOSED"], default: "OPEN" },
    assignedVetId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.models.Emergency || mongoose.model("Emergency", EmergencySchema);
