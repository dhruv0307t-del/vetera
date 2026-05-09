import connectDB from "@/lib/db";
import Transaction from "@/models/Transaction";
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
    const transactions = await Transaction.find({ farmId: decoded.id }).sort({ date: -1 });
    return NextResponse.json({ success: true, data: transactions });
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
    const transaction = await Transaction.create({ ...body, farmId: decoded.id });
    return NextResponse.json({ success: true, data: transaction });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
