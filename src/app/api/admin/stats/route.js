import connectDB from "@/lib/db";
import User from "@/models/User";
import Farm from "@/models/Farm";
import Doctor from "@/models/Doctor";
import Animal from "@/models/Animal";
import Appointment from "@/models/Appointment";

export async function GET() {
  await connectDB();

  return Response.json({
    totalUsers: await User.countDocuments(),
    petOwners: await User.countDocuments({ role: "PET_OWNER" }),
    vets: await User.countDocuments({ role: "VET" }),
    farms: await Farm.countDocuments(),
    animals: await Animal.countDocuments(),
    appointments: await Appointment.countDocuments(),
    pendingApprovals: await User.countDocuments({ isApproved: false }),
  });
}
