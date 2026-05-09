import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },

    serviceType: {
      type: String,
      enum: ["VET_CHECKUP", "GROOMING"],
      default: "VET_CHECKUP"
    },

    dateTime: Date,
    timeSlot: String,
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
    symptoms: [String],
    concern: String,
    
    // Additional fields for fast booking without full Animal profile
    petName: String,
    petType: String,
    petBreed: String,
    petAge: String,
    
    ownerName: String,
    ownerPhone: String,
    ownerEmail: String,

    // Grooming specifics
    coatCondition: String,
    groomingInstructions: String,

    consultationFee: Number,
    rescheduleDate: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
