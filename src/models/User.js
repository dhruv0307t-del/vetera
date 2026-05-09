import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ADMIN", "Pet Owner", "Farm", "Veterinary Doctor", "Retailer", "Grooming Shop", "Customer"],
      required: true,
    },

    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String },

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
