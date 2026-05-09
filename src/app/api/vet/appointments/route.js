import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Earning from "@/models/Earning";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const status = url.searchParams.get("status"); // optional filter

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    const query = { doctorId: doctor._id };
    if (status && status !== "ALL") query.status = status;

    const appointments = await Appointment.find(query)
      .populate("clientId", "fullName email phone")
      .populate("animalId", "name species breed age weight")
      .sort({ dateTime: -1 });

    return NextResponse.json({ success: true, data: appointments });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { appointmentId, status, rescheduleDate, userId } = await req.json();

    const appt = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status, ...(rescheduleDate ? { rescheduleDate } : {}) },
      { new: true }
    );

    // Auto-create earning record when appointment is completed
    if (status === "COMPLETED" && appt.consultationFee) {
      const doctor = await Doctor.findOne({ userId });
      if (doctor) {
        await Earning.create({
          doctorId: doctor._id,
          appointmentId,
          amount: appt.consultationFee,
          type: appt.visitType === "TELE" ? "TELE" : appt.visitType === "HOME" ? "HOME_VISIT" : "CONSULTATION",
          status: "PENDING",
        });
      }
    }

    return NextResponse.json({ success: true, data: appt });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
