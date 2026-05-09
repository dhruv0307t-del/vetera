import connectDB from "@/lib/db";
import HealthRecord from "@/models/HealthRecord";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const newRecord = await HealthRecord.create(data);

    return NextResponse.json(
      { success: true, message: "Health profile saved successfully", data: newRecord },
      { status: 201 }
    );
  } catch (error) {
    console.error("Health Record Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save record", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    // Fetch records in descending order (newest first)
    const records = await HealthRecord.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error("Fetch Health Records Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve records" },
      { status: 500 }
    );
  }
}
