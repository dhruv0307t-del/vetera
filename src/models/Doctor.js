import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    qualification: String,
    specialization: [String],
    experienceYears: Number,

    clinicName: String,
    clinicAddress: String,

    licenseNumber: String,
    registrationId: String,

    consultationFee: Number,
    homeVisitFee: Number,
    teleConsultation: Boolean,

    services: [String],
    areasCovered: [String],

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor ||
  mongoose.model("Doctor", DoctorSchema);
