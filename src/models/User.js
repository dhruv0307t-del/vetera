import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ADMIN", "PET_OWNER", "FARM_OWNER", "VET", "RETAILER", "GROOMING"],
      required: true,
    },

    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    address: String,
    city: String,
    state: String,
    pinCode: String,

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
