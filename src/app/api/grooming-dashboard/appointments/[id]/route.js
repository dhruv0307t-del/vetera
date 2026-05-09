import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json({ success: false, message: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
