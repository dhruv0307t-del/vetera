import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },

    dateTime: Date,
    visitType: {
      type: String,
      enum: ["CLINIC", "HOME", "TELE"],
    },

    status: {
      type: String,
      enum: ["REQUESTED", "CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "REQUESTED",
    },

    notes: String,
    fee: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
