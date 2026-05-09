import connectDB from "@/lib/db";
import User from "@/models/User";
import Farm from "@/models/Farm";
import Doctor from "@/models/Doctor";
import Animal from "@/models/Animal";
import Appointment from "@/models/Appointment";
import Earning from "@/models/Earning";

export async function GET() {
  await connectDB();

  const [totalUsers, petOwners, vets, farms, animals, appointments, pendingApprovals, groomingShops, retailers] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "PET_OWNER" }),
      User.countDocuments({ role: "VET" }),
      Farm.countDocuments(),
      Animal.countDocuments(),
      Appointment.countDocuments(),
      User.countDocuments({ isApproved: false }),
      User.countDocuments({ role: "GROOMING" }),
      User.countDocuments({ role: "RETAILER" }),
    ]);

  return Response.json({
    totalUsers,
    petOwners,
    vets,
    farms,
    animals,
    appointments,
    pendingApprovals,
    groomingShops,
    retailers,
  });
}
