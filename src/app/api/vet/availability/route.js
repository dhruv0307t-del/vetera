import connectDB from "@/lib/db";
import Availability from "@/models/Availability";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    const availability = await Availability.findOne({ doctorId: doctor._id });
    return NextResponse.json({ success: true, data: availability || {} });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, workingDays, slots, breakTimes, blockedDates, isEmergencyAvailable } = body;

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    const availability = await Availability.findOneAndUpdate(
      { doctorId: doctor._id },
      { doctorId: doctor._id, workingDays, slots, breakTimes, blockedDates, isEmergencyAvailable },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: availability });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
