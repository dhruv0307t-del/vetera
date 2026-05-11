import connectDB from "@/lib/db";
import VerificationProfile from "@/models/VerificationProfile";
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

    let profile = await VerificationProfile.findOne({ userId: decoded.id });
    if (!profile) {
      profile = await VerificationProfile.create({ userId: decoded.id, role: decoded.role });
    }

    const User = (await import("@/models/User")).default;
    const user = await User.findById(decoded.id).select("isApproved");

    return NextResponse.json({ success: true, data: { ...profile.toObject(), isUserApproved: user?.isApproved } });
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
    
    // Find and update
    const profile = await VerificationProfile.findOneAndUpdate(
      { userId: decoded.id },
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
