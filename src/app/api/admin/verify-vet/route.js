import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const vets = await Doctor.find().populate("userId", "fullName email phone isApproved");
    return NextResponse.json({ success: true, data: vets });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { doctorId, verificationStatus, adminRemarks } = await req.json();

    if (!doctorId || !verificationStatus) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const updatedVet = await Doctor.findByIdAndUpdate(
      doctorId,
      { verificationStatus, adminRemarks },
      { new: true }
    );

    if (!updatedVet) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      message: `Vet has been successfully marked as ${verificationStatus}`,
      data: updatedVet,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Update Error", error: error.message }, { status: 500 });
  }
}
