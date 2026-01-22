import connectDB from "@/lib/db";
import Farm from "@/models/Farm";

export async function PATCH(req, { params }) {
  await connectDB();

  const { action } = await req.json();

  const farm = await Farm.findByIdAndUpdate(
    params.id,
    { isApproved: action === "approve" },
    { new: true }
  );

  return Response.json({
    success: true,
    farm,
  });
}
