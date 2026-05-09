import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    // Fetch users with role GROOMING or "Grooming Shop"
    const shops = await User.find({ role: { $in: ["GROOMING", "Grooming Shop"] } }).select("-password");

    return NextResponse.json({ success: true, data: shops });
  } catch (error) {
    console.error("GET GROOMING SHOPS ERROR:", error);
    return NextResponse.json({ success: false, message: "Error fetching Grooming Shops", error: error.message }, { status: 500 });
  }
}
