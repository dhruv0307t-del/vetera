import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import Appointment from "@/models/Appointment";
import Review from "@/models/Review";
import Earning from "@/models/Earning";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { cookies } = await import("next/headers");
    const jwt = await import("jsonwebtoken");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) return NextResponse.json({ success: false, message: "userId required" }, { status: 400 });

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    const doctorId = doctor._id;

    // Today's appointments
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

    const [todayAppts, pendingAppts, allAppts, reviews, earnings] = await Promise.all([
      Appointment.countDocuments({ doctorId, dateTime: { $gte: todayStart, $lte: todayEnd } }),
      Appointment.countDocuments({ doctorId, status: "REQUESTED" }),
      Appointment.countDocuments({ doctorId }),
      Review.find({ doctorId }),
      Earning.find({ doctorId }),
    ]);

    // Unique patients
    const uniquePatients = await Appointment.distinct("animalId", { doctorId });

    // Earnings
    const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    const monthlyEarnings = earnings.filter(e => e.createdAt >= monthStart).reduce((sum, e) => sum + e.amount, 0);

    // Rating
    const avgRating = reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    // License expiry alert
    const licenseAlert = doctor.licenseExpiry
      ? (new Date(doctor.licenseExpiry) - new Date()) / (1000 * 60 * 60 * 24) <= 30
      : false;

    return NextResponse.json({
      success: true,
      data: {
        todayAppointments: todayAppts,
        pendingRequests: pendingAppts,
        totalAppointments: allAppts,
        totalPatients: uniquePatients.length,
        totalEarnings,
        monthlyEarnings,
        avgRating,
        verificationStatus: doctor.verificationStatus,
        licenseExpiryAlert: licenseAlert,
        licenseExpiry: doctor.licenseExpiry,
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
