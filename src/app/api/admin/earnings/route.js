import connectDB from "@/lib/db";
import Earning from "@/models/Earning";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const earnings = await Earning.find()
      .populate({
        path: "doctorId",
        populate: { path: "userId", select: "fullName email" }
      })
      .populate("appointmentId", "visitType dateTime")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, earnings });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
