import connectDB from "@/lib/db";
import User from "@/models/User";
import Farm from "@/models/Farm";
import Doctor from "@/models/Doctor";

export async function GET(req, { params }) {
  await connectDB();

  const user = await User.findById(params.id).lean();
  if (!user) {
    return Response.json({ success: false }, { status: 404 });
  }

  let farm = null;
  let vet = null;

  if (user.role === "FARM_OWNER") {
    farm = await Farm.findOne({ ownerId: user._id }).lean();
  }

  if (user.role === "VET") {
    vet = await Doctor.findOne({ userId: user._id }).lean();
  }

  return Response.json({
    success: true,
    user,
    farm,
    vet,
  });
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();

  await User.findByIdAndUpdate(params.id, body);
  return Response.json({ success: true });
}
