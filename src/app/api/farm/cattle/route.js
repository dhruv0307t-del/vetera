import connectDB from "@/lib/db";
import Cattle from "@/models/Cattle";
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
    const farmId = decoded.id; 

    let cattle = await Cattle.find({ farmId }).sort({ createdAt: -1 });

    // Mock data for initial empty state to demonstrate enterprise UI
    if (cattle.length === 0) {
      cattle = [
        { _id: "1", tagId: "TAG-001", rfid: "RFID8932", species: "COW", breed: "Holstein Friesian", gender: "FEMALE", age: "3 Yrs", weight: 650, status: "ACTIVE", healthScore: 98, averageMilkYield: 25 },
        { _id: "2", tagId: "TAG-002", rfid: "RFID8933", species: "COW", breed: "Jersey", gender: "FEMALE", age: "4 Yrs", weight: 520, status: "PREGNANT", healthScore: 95, averageMilkYield: 18 },
        { _id: "3", tagId: "TAG-003", rfid: "RFID8934", species: "BUFFALO", breed: "Murrah", gender: "FEMALE", age: "5 Yrs", weight: 700, status: "SICK", healthScore: 65, averageMilkYield: 12 },
        { _id: "4", tagId: "TAG-004", rfid: "RFID8935", species: "COW", breed: "Sahiwal", gender: "MALE", age: "2 Yrs", weight: 450, status: "ACTIVE", healthScore: 100, averageMilkYield: 0 },
        { _id: "5", tagId: "TAG-005", rfid: "RFID8936", species: "COW", breed: "Holstein Friesian", gender: "FEMALE", age: "6 Yrs", weight: 680, status: "DRY", healthScore: 88, averageMilkYield: 0 },
      ];
    }

    return NextResponse.json({ success: true, data: cattle });
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
    const newCattle = await Cattle.create({ ...body, farmId });

    return NextResponse.json({ success: true, data: newCattle });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
