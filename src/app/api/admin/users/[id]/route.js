import connectDB from "@/lib/db";
import User from "@/models/User";
import Farm from "@/models/Farm";
import Doctor from "@/models/Doctor";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  const user = await User.findById(id).lean();
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
  const { id } = await params;
  const body = await req.json();

  await User.findByIdAndUpdate(id, body);
  return Response.json({ success: true });
}

export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;
  const { action } = await req.json();

  const isApproved = action === "approve" ? true : action === "reject" ? false : undefined;

  if (isApproved === undefined) {
    return Response.json({ success: false, message: "Invalid action" }, { status: 400 });
  }

  await User.findByIdAndUpdate(id, { isApproved });
  return Response.json({ success: true, message: `User ${action}d successfully` });
}
