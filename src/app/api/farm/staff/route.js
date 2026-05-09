import connectDB from "@/lib/db";
import { Staff, Attendance } from "@/models/Staff";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ success: false }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET);
    const farmId = decoded.id;
    const staffs = await Staff.find({ farmId });
    // Also get today's attendance
    const today = new Date();
    today.setHours(0,0,0,0);
    const attendance = await Attendance.find({ farmId, date: { $gte: today } });
    return NextResponse.json({ success: true, data: { staffs, attendance } });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ success: false }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET);
    const body = await req.json();
    
    if (body.action === "ADD_STAFF") {
      const staff = await Staff.create({ ...body.data, farmId: decoded.id });
      return NextResponse.json({ success: true, data: staff });
    }
    
    if (body.action === "MARK_ATTENDANCE") {
      const record = await Attendance.create({ ...body.data, farmId: decoded.id });
      return NextResponse.json({ success: true, data: record });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
