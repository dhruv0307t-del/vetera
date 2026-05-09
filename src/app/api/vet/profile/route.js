import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, ...updates } = body;

    const allowedFields = [
      "bio", "profilePhoto", "clinicName", "clinicAddress",
      "consultationFee", "homeVisitFee", "teleConsultation",
      "availableConsultationTypes", "services", "areasCovered",
      "isProfileVisible", "licenseExpiry"
    ];

    const sanitized = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined) sanitized[key] = updates[key];
    }

    const doctor = await Doctor.findOneAndUpdate({ userId }, sanitized, { new: true });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: doctor });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
