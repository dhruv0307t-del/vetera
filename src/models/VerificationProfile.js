import mongoose from "mongoose";

const VerificationProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    role: { type: String, required: true }, // 'Veterinary Doctor' or 'Grooming Shop'
    status: {
      type: String,
      enum: ["INCOMPLETE", "PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED", "RESUBMISSION_REQUIRED", "SUSPENDED"],
      default: "INCOMPLETE",
    },
    progress: { type: Number, default: 0 },
    adminRemarks: { type: String, default: "" },

    // VET SPECIFIC DETAILS
    vetDetails: {
      registrationNumber: String,
      licenseNumber: String,
      council: String,
      qualification: String,
      specialization: String,
      experience: Number,
      consultationFees: Number,
      emergencyAvailability: Boolean,
      languages: [String],
      clinicName: String,
      clinicAddress: String,
      clinicGeoLocation: { lat: String, lng: String },
      workingHours: String,
      weeklyOff: String,
      staffCount: Number,
      servicesOffered: [String],
    },

    // GROOMING SPECIFIC DETAILS
    groomingDetails: {
      shopName: String,
      ownerName: String,
      registrationNumber: String,
      gstNumber: String,
      address: String,
      city: String,
      state: String,
      geoLocation: { lat: String, lng: String },
      whatsappNumber: String,
      servicesOffered: [String],
      staffCount: Number,
      experience: Number,
      workingHours: String,
      weeklyOff: String,
      equipmentDetails: String,
    },

    // DOCUMENTS
    documents: {
      profilePhoto: String,
      signature: String,
      govtId: String,
      // Vet
      degreeCertificate: String,
      license: String,
      clinicRegistration: String,
      clinicPhotos: [String],
      // Grooming
      businessLicense: String,
      gstCertificate: String,
      shopImages: [String],
      staffIdProofs: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.VerificationProfile || mongoose.model("VerificationProfile", VerificationProfileSchema);
