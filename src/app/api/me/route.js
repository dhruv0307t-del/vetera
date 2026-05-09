import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}
