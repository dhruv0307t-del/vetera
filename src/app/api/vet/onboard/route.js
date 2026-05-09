import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const {
      userId,
      qualification,
      specialization,
      experienceYears,
      clinicName,
      clinicAddress,
      licenseNumber,
      registrationId,
      consultationFee,
      homeVisitFee,
      teleConsultation,
      services,
      areasCovered,
      documents
    } = data;

    if (!userId) {
      return NextResponse.json({ success: false, message: "userId is required for KYC Onboarding" }, { status: 400 });
    }

    // Upsert Doctor profile: if returning to upload missing documents, it updates it. Otherwise creates new.
    const doctorProfile = await Doctor.findOneAndUpdate(
      { userId },
      {
        userId,
        qualification,
        specialization,
        experienceYears,
        clinicName,
        clinicAddress,
        licenseNumber,
        registrationId,
        consultationFee,
        homeVisitFee,
        teleConsultation,
        services,
        areasCovered,
        documents,
        verificationStatus: 'PENDING' // Newly altered data goes back to pending for Admin
      },
      { new: true, upsert: true }
    );

    // Make sure user role is set to VET
    await User.findByIdAndUpdate(userId, { role: "VET" });

    return NextResponse.json({
      success: true,
      message: "Vet onboarding details submitted securely. Admin KYC verification is pending.",
      data: doctorProfile
    }, { status: 201 });

  } catch (error) {
    console.error("Vet Onboard Error:", error);
    return NextResponse.json({ success: false, message: "Onboarding failed", error: error.message }, { status: 500 });
  }
}
