import connectDB from "@/lib/db";
import MilkRecord from "@/models/MilkRecord";
import Cattle from "@/models/Cattle";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ success: false }, { status: 401 });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const farmId = decoded.id; 

    const logs = await MilkRecord.find({ farmId }).populate("cattleId").sort({ date: -1 });
    return NextResponse.json({ success: true, data: logs });
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
    const farmId = decoded.id; 

    const body = await req.json();
    const { cattleId, date, shift, yieldLiters, fatPercentage, snfPercentage } = body;

    const log = await MilkRecord.create({
      farmId,
      cattleId,
      date: new Date(date),
      shift,
      yieldLiters,
      fatPercentage,
      snfPercentage
    });

    // Optionally update Cattle average yield here
    const cattleLogs = await MilkRecord.find({ cattleId });
    const totalYield = cattleLogs.reduce((acc, curr) => acc + curr.yieldLiters, 0);
    const avgYield = totalYield / cattleLogs.length;
    await Cattle.findByIdAndUpdate(cattleId, { averageMilkYield: avgYield.toFixed(2) });

    return NextResponse.json({ success: true, data: log });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
