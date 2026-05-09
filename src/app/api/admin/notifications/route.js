import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, notifications: [] });
}

export async function POST(req) {
  try {
    const { title, message } = await req.json();
    // In production: persist notification to DB and push to users
    console.log("Admin broadcast:", { title, message });
    return NextResponse.json({ success: true, message: "Notification sent to all users" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
