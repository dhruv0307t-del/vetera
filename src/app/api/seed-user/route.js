import connectDB from "@/lib/db";
import User from "@/context/models/User";

export async function GET() {
  await connectDB();

  const user = await User.create({
    role: "ADMIN",
    fullName: "VetEra Admin",
    email: "admin@vetera.com",
    phone: "9999999999",
    isApproved: true,
  });

  return Response.json({ success: true, user });
}
