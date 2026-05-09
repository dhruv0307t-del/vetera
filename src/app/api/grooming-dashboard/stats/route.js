import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const shopId = decoded.id; // The logged-in user who is a Grooming Shop

    // Calculate stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find({ shopId });
    
    const todaysAppointments = appointments.filter(a => {
      const aDate = new Date(a.dateTime);
      return aDate >= today && aDate < new Date(today.getTime() + 86400000);
    }).length;

    const completedThisWeek = appointments.filter(a => {
      const aDate = new Date(a.dateTime);
      const weekAgo = new Date(today.getTime() - 7 * 86400000);
      return a.status === "COMPLETED" && aDate >= weekAgo;
    }).length;

    // Fake revenue and rating
    const revenue = completedThisWeek * 800; // Assume 800 per groom
    const rating = 4.8;

    const recent = await Appointment.find({ shopId })
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({ 
      success: true, 
      stats: { appointments: todaysAppointments, completed: completedThisWeek, revenue, rating },
      recent 
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
