import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
    notes: { type: String, default: "" },
    diagnosis: { type: String, default: "" },
    recommendations: { type: String, default: "" },
    prescriptionUrl: String, // Cloudinary/S3 URL for PDF
    reportGenerated: { type: Boolean, default: false },
    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Consultation || mongoose.model("Consultation", ConsultationSchema);
