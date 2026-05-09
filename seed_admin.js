import mongoose from "mongoose";
import User from "./src/models/User.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/vetera");
    console.log("Connected to MongoDB...");

    const admin = await User.findOneAndUpdate(
      { email: "admin@vetera.com" },
      {
        fullName: "Master Admin",
        email: "admin@vetera.com",
        password: "adminpassword123",
        role: "ADMIN",
        phone: "9999999999",
        isApproved: true,
      },
      { upsert: true, new: true }
    );

    console.log("Master Admin Seeded:", admin.email);
    console.log("Password: adminpassword123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
