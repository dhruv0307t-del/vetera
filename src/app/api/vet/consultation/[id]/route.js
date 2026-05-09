import connectDB from "@/lib/db";
import Consultation from "@/models/Consultation";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const consultation = await Consultation.findOne({ appointmentId: params.id })
      .populate("petId", "name species breed age weight");
    return NextResponse.json({ success: true, data: consultation || {} });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { doctorId, petId, notes, diagnosis, recommendations, prescriptionUrl } = body;

    const consultation = await Consultation.findOneAndUpdate(
      { appointmentId: params.id },
      {
        appointmentId: params.id,
        doctorId,
        petId,
        notes,
        diagnosis,
        recommendations,
        prescriptionUrl,
        reportGenerated: true,
        completedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: consultation });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
