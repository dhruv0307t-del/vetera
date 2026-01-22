import connectDB from "@/lib/db";
import Farm from "@/models/Farm";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const farms = await Farm.find()
      .populate("ownerId", "fullName email phone")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      farms,
    });
  } catch (err) {
    console.error("ADMIN FARMS ERROR:", err);
    return Response.json(
      { success: false, message: "Failed to fetch farms" },
      { status: 500 }
    );
  }
}
