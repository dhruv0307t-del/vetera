import connectDB from "@/lib/db";
import FeedStock from "@/models/FeedStock";
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
    const stocks = await FeedStock.find({ farmId: decoded.id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: stocks });
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
    const stock = await FeedStock.create({ ...body, farmId: decoded.id });
    return NextResponse.json({ success: true, data: stock });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
