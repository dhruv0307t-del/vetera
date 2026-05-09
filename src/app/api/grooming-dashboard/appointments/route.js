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
    const shopId = decoded.id; 

    const appointments = await Appointment.find({ shopId })
      .sort({ dateTime: -1 });

    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
