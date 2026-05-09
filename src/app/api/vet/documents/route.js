import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      data: {
        verificationStatus: doctor.verificationStatus,
        adminRemarks: doctor.adminRemarks,
        documents: doctor.documents,
        licenseExpiry: doctor.licenseExpiry,
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { userId, documentType, documentUrl } = await req.json();
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    doctor.documents[documentType] = documentUrl;
    doctor.verificationStatus = "PENDING"; // Re-submit triggers a new review
    doctor.adminRemarks = "";
    await doctor.save();

    return NextResponse.json({ success: true, message: "Document updated. Re-submitted for review." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
