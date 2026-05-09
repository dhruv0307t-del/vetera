import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    // Get all completed appointments and their unique pets
    const appointments = await Appointment.find({
      doctorId: doctor._id,
      status: "COMPLETED",
    }).populate("animalId").populate("clientId", "fullName email phone");

    // Deduplicate by pet
    const petMap = new Map();
    for (const appt of appointments) {
      if (appt.animalId) {
        const petId = appt.animalId._id.toString();
        if (!petMap.has(petId)) {
          petMap.set(petId, {
            pet: appt.animalId,
            owner: appt.clientId,
            consultations: [],
          });
        }
        petMap.get(petId).consultations.push({
          date: appt.dateTime,
          status: appt.status,
          visitType: appt.visitType,
          symptoms: appt.symptoms,
        });
      }
    }

    return NextResponse.json({ success: true, data: Array.from(petMap.values()) });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
