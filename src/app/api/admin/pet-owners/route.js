import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const petOwners = await User.find({ role: "PET_OWNER" })
    .sort({ createdAt: -1 });

  return Response.json({
    success: true,
    petOwners,
  });
}
