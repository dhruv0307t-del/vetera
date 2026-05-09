import mongoose from "mongoose";

const EarningSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["CONSULTATION", "HOME_VISIT", "TELE"], default: "CONSULTATION" },
    status: { type: String, enum: ["PENDING", "PAID", "WITHDRAWN"], default: "PENDING" },
    paidAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Earning || mongoose.model("Earning", EarningSchema);
