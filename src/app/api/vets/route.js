import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    // Only fetch Vets who have been APPROVED by Admin KYC process
    const vets = await Doctor.find({ verificationStatus: "APPROVED" })
      .populate("userId", "fullName email")
      .sort({ rating: -1 }); // Show highest rated vets first

    return NextResponse.json({ success: true, data: vets });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching Vets", error: error.message }, { status: 500 });
  }
}
