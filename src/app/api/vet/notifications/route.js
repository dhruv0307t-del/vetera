import connectDB from "@/lib/db";
import Notification from "@/models/Notification";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(50);

    // Mark all as read
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });

    return NextResponse.json({ success: true, data: notifications });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
