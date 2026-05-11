import connectDB from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req, { params }) {
  await connectDB();

  const { id } = await params;
  const { action } = await req.json();

  const vet = await User.findByIdAndUpdate(
    id,
    { isApproved: action === "approve" },
    { new: true }
  );

  return Response.json({
    success: true,
    vet,
  });
}
