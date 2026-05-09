import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req) {
  try {
    await connectDB();
    
    // Get user from token if logged in
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    let clientId = null;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        clientId = decoded.id;
      } catch (e) {
        console.warn("Invalid token for appointment booking");
      }
    }

    const data = await req.json();
    
    // Process the data
    const appointmentData = {
      ...data,
      clientId,
      status: "REQUESTED",
    };

    if (data.serviceType === "checkup") {
      appointmentData.doctorId = data.providerId;
    } else if (data.serviceType === "grooming") {
      appointmentData.shopId = data.providerId;
    }

    // Map location to visitType
    if (data.location === "clinic") appointmentData.visitType = "CLINIC";
    else if (data.location === "home") appointmentData.visitType = "HOME";
    else if (data.location === "online") appointmentData.visitType = "TELE";

    if (data.date) {
      appointmentData.dateTime = new Date(data.date);
    }

    const appointment = await Appointment.create(appointmentData);

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Appointment POST Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const clientId = decoded.id;

    const appointments = await Appointment.find({ clientId })
      .populate({ path: "doctorId", populate: { path: "userId", select: "fullName" }})
      .populate("shopId", "businessName fullName")
      .sort({ dateTime: -1 });

    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error("Appointment GET Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
