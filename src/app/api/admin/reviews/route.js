import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find()
      .populate("doctorId", "clinicName userId")
      .populate("petOwnerId", "fullName email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
