import connectDB from "@/lib/db";
import User from "@/models/User";
import Doctor from "@/models/Doctor";

export async function GET() {
  await connectDB();

  const vets = await Doctor.find()
    .populate("userId", "fullName email phone isApproved")
    .sort({ createdAt: -1 });

  return Response.json({
    success: true,
    vets,
  });
}
