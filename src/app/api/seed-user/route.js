import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  // Check if admin already exists
  const existing = await User.findOne({ email: "admin@vetera.com" });

  if (existing) {
    // Update password for testing
    await User.findByIdAndUpdate(existing._id, {
      password: "Admin@1234",
      isApproved: true,
    });
    return Response.json({ success: true, message: "Admin password updated to Admin@1234", user: existing });
  }

  const user = await User.create({
    role: "ADMIN",
    fullName: "VetEra Admin",
    email: "admin@vetera.com",
    phone: "9999999999",
    password: "Admin@1234",
    isApproved: true,
  });

  return Response.json({ success: true, message: "Admin created with password Admin@1234", user });
}
