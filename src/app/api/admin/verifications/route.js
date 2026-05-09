import connectDB from "@/lib/db";
import VerificationProfile from "@/models/VerificationProfile";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const verifications = await VerificationProfile.find()
      .populate("userId", "fullName email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: verifications });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, status, adminRemarks, userId } = body;

    const profile = await VerificationProfile.findByIdAndUpdate(
      id,
      { status, adminRemarks },
      { new: true }
    );

    if (status === "APPROVED") {
      await User.findByIdAndUpdate(userId, { isApproved: true });
    } else if (status === "REJECTED" || status === "SUSPENDED" || status === "RESUBMISSION_REQUIRED") {
      await User.findByIdAndUpdate(userId, { isApproved: false });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
