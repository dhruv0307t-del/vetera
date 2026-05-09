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
    licenseExpiry: Date,

    consultationFee: Number,
    homeVisitFee: Number,
    teleConsultation: Boolean,

    services: [String],
    areasCovered: [String],

    rating: {
      type: Number,
      default: 0,
    },
    
    // KYC and Verification
    verificationStatus: { 
      type: String, 
      enum: ['PENDING', 'APPROVED', 'REJECTED'], 
      default: 'PENDING' 
    },
    documents: {
      degreeCertificate: String,
      licenseCertificate: String,
      governmentId: String,
      additionalCertifications: String
    },
    adminRemarks: String,

    // Profile extras
    bio: { type: String, default: "" },
    profilePhoto: { type: String, default: "" },
    isProfileVisible: { type: Boolean, default: true },
    availableConsultationTypes: {
      type: [String],
      enum: ["ONLINE", "OFFLINE", "HOME_VISIT"],
      default: ["ONLINE", "OFFLINE"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor ||
  mongoose.model("Doctor", DoctorSchema);
