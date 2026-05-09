import connectDB from "@/lib/db";
import Earning from "@/models/Earning";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    const earnings = await Earning.find({ doctorId: doctor._id })
      .populate("appointmentId", "dateTime visitType")
      .sort({ createdAt: -1 });

    const total = earnings.reduce((s, e) => s + e.amount, 0);
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    const monthly = earnings.filter(e => new Date(e.createdAt) >= monthStart).reduce((s, e) => s + e.amount, 0);

    return NextResponse.json({ success: true, data: { earnings, total, monthly } });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
