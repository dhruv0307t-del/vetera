import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true, unique: true },
    workingDays: {
      type: [String],
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    slots: [
      {
        startTime: String, // "09:00"
        endTime: String,   // "10:00"
        isBooked: { type: Boolean, default: false },
      },
    ],
    breakTimes: [
      {
        startTime: String,
        endTime: String,
      },
    ],
    blockedDates: [Date],
    isEmergencyAvailable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Availability || mongoose.model("Availability", AvailabilitySchema);
