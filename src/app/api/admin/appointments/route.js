import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function GET() {
  await connectDB();

  const appointments = await Appointment.find()
    .populate("clientId", "fullName role")
    .populate("doctorId", "fullName")
    .populate("animalId", "animalName species")
    .sort({ date: -1 });

  return Response.json({
    success: true,
    appointments,
  });
}
