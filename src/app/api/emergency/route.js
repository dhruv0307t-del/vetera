import connectDB from "@/lib/db";
import Emergency from "@/models/Emergency";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const emergency = await Emergency.create(body);
    return NextResponse.json({ success: true, emergency }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const emergencies = await Emergency.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, emergencies });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
